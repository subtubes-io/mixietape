// SseComponent.tsx
import React, { useEffect, useState } from 'react';
import { useSec10qStore } from '@/stores/sec10qStore';

export default function SseComponent() {
  const [data, setData] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const userId = '123'; // Replace with dynamic user ID from your auth context
  const authToken = 'your-auth-token'; // Replace with your actual auth token

  const addSec10qData = useSec10qStore((state) => state.addData);

  useEffect(() => {
    let isCancelled = false;
    let initialReader: ReadableStreamDefaultReader | null = null;
    let retryDelay = 1000; // Start with a 1-second delay

    function handleEvent(event: string) {
      if (event.trim()) {
        const dataStr = event.replace(/^data: /, '');

        try {
          const parsedData = JSON.parse(dataStr);

          // Route data to the appropriate store based on metadata.type
          switch (parsedData.metadata?.type) {
            case 'sec10q':
              addSec10qData(parsedData);
              break;
            // Add more cases for different metadata types if needed
            default:
              console.warn(
                `Unhandled metadata type: ${parsedData.metadata?.type}`,
              );
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }

        setData((prevData) => [...prevData, dataStr]);
      }
    }

    function retryConnection() {
      if (isCancelled) return;

      retryDelay = Math.min(retryDelay * 2, 64000);
      setTimeout(() => {
        if (!isCancelled) {
          // eslint-disable-next-line no-use-before-define
          fetchSse();
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
          if (done || isCancelled) return;

          const chunk = decoder.decode(value, { stream: true });
          const events = chunk.split('\n\n');
          events.forEach(handleEvent);

          readChunk(reader, decoder);
        })
        .catch((error) => {
          console.error('Error reading stream:', error);
          setConnectionStatus('Disconnected');
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
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => {
          if (!response.body) {
            setConnectionStatus('Disconnected');
            return;
          }

          retryDelay = 1000;
          setConnectionStatus('Connected');
          initialReader = response.body.getReader();
          const decoder = new TextDecoder();
          readChunk(initialReader, decoder);
        })
        .catch((error) => {
          console.error(error);
          setConnectionStatus('Disconnected');
          retryConnection();
        });
    }

    fetchSse();

    return function cleanup() {
      isCancelled = true;
      if (initialReader) {
        initialReader
          .cancel()
          .catch((error) => console.error('Error cancelling reader:', error));
        initialReader.releaseLock();
      }
    };
  }, [userId, authToken, addSec10qData]);

  return <div>icon in here</div>;
}
