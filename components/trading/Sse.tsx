import React, { useEffect, useState } from 'react';

export default function SseComponent() {
  const [data, setData] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const userId = '123'; // Replace with dynamic user ID from your auth context

  useEffect(() => {
    setConnectionStatus('Connecting...');
    const eventSource = new EventSource(
      `http://localhost:3000/sse?user_id=${userId}`,
    );

    eventSource.onopen = () => {
      console.log('Connection to server opened.');
      setConnectionStatus('Connected');
    };

    eventSource.onmessage = (event) => {
      console.log('Received:', event.data);
      setData((prevData) => [...prevData, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      setConnectionStatus('Disconnected');
      // Reconnect logic is handled automatically by EventSource
    };

    return () => {
      eventSource.close();
      console.log('EventSource closed.');
    };
  }, [userId]);

  return (
    <div>
      <h1>Server-Sent Events</h1>
      <p>Status: {connectionStatus}</p>
      <ul>{data.map(renderItem)}</ul>
    </div>
  );
}

function renderItem(item: string, index: number) {
  return <li key={index}>{item}</li>;
}
