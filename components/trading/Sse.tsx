import React, { useEffect, useState } from 'react';

export default function SseComponent() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    let isCancelled = false;
    let reader: ReadableStreamDefaultReader | null = null;

    function fetchSse() {
      fetch('http://localhost:3000/sse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({ user_id: 123 }),
      })
        .then((response) => {
          if (!response.body) {
            console.error('ReadableStream not supported in this browser.');
            return;
          }

          reader = response.body.getReader();
          const decoder = new TextDecoder();
          readChunk(reader, decoder);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
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
        });
    }

    function handleEvent(event: string) {
      if (event.trim()) {
        // Remove 'data: ' prefix
        const dataStr = event.replace(/^data: /, '');
        setData((prevData) => [...prevData, dataStr]);
      }
    }

    fetchSse();

    return function cleanup() {
      isCancelled = true;
      if (reader) {
        reader.cancel().catch((error) => {
          console.error('Error cancelling reader:', error);
        });
        reader.releaseLock();
      }
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events</h1>
      <ul>{data.map(renderItem)}</ul>
    </div>
  );
}

function renderItem(item: string, index: number) {
  return <li key={index}>{item}</li>;
}
