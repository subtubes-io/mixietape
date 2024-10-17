import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';

import { useToastStore } from '@/stores/toast-store';

// interface ToastProps {}

function Toast() {
  const toastStore = useToastStore();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (toastStore.isVisible) {
      const timer = setTimeout(() => {
        toastStore.hide();
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastStore.isVisible]);

  return (
    <div className="fixed top-4 right-4 z-50" style={{ width: '300px' }}>
      <Transition
        show={toastStore.isVisible}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm w-full bg-fuchsia-600 text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium">{toastStore.message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  type="submit"
                  className="bg-fuchsia-600 rounded-lg inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-600"
                  onClick={() => {
                    toastStore.hide();
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Toast;
