// SseComponent.tsx
import React, { useEffect, useState } from 'react';

function renderItem(item: string, index: number) {
  return <li key={index}>{item}</li>;
}

export default function SseComponent() {
  const [data, setData] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const userId = '123'; // Replace with dynamic user ID from your auth context
  const authToken = 'your-auth-token'; // Replace with your actual auth token

  useEffect(() => {
    let isCancelled = false;
    let initialReader: ReadableStreamDefaultReader | null = null;
    let retryDelay = 1000; // Start with a 1-second delay

    function handleEvent(event: string) {
      if (event.trim()) {
        // Remove 'data: ' prefix
        const dataStr = event.replace(/^data: /, '');
        setData((prevData) => [...prevData, dataStr]);
      }
    }

    function retryConnection() {
      if (isCancelled) return;

      // Limit the delay to a maximum of 64 seconds
      retryDelay = Math.min(retryDelay * 2, 64000);

      console.log(`Retrying connection in ${retryDelay / 1000} seconds...`);
      setTimeout(() => {
        if (!isCancelled) {
          // eslint-disable-next-line no-use-before-define
          fetchSse(); // had to make an exception because the functions call each other
        }
      }, retryDelay);
    }
    function readChunk(
      reader: ReadableStreamDefaultReader<Uint8Array>,
      decoder: TextDecoder,
    ) {
      reader
        .read()
        .then(({ value, done }) => {
          if (done || isCancelled) {
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          console.log('Received:', chunk);

          // Split the chunk by double newlines to handle multiple events
          const events = chunk.split('\n\n');
          events.forEach(handleEvent);

          // Read the next chunk
          readChunk(reader, decoder);
        })
        .catch((error) => {
          console.error('Error reading stream:', error);
          setConnectionStatus('Disconnected');
          // Retry with exponential backoff
          retryConnection();
        });
    }

    function fetchSse() {
      setConnectionStatus('Connecting...');

      fetch('http://localhost:3000/sse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${authToken}`, // Include auth token in headers
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => {
          if (!response.body) {
            console.error('ReadableStream not supported in this browser.');
            setConnectionStatus('Disconnected');
            return;
          }

          // Reset retry delay on successful connection
          retryDelay = 1000;
          setConnectionStatus('Connected');
          initialReader = response.body.getReader();
          const decoder = new TextDecoder();
          readChunk(initialReader, decoder);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          setConnectionStatus('Disconnected');
          // Retry with exponential backoff
          retryConnection();
        });
    }

    fetchSse();

    return function cleanup() {
      isCancelled = true;
      if (initialReader) {
        initialReader.cancel().catch((error) => {
          console.error('Error cancelling reader:', error);
        });
        initialReader.releaseLock();
      }
    };
  }, [userId, authToken]);

  return (
    <div>
      <h1>Server-Sent Events</h1>
      <p>Status: {connectionStatus}</p>
      <ul>{data.map(renderItem)}</ul>
    </div>
  );
}
