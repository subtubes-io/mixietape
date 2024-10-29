import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'; // You can use any icon library you prefer

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="flex items-center bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <ExclamationCircleIcon className="h-5 w-5 text-pink-700 mr-2" />
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
