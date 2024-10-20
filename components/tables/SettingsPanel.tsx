import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';

interface SettingsPanelOptions {
  children: React.ReactNode;
}
export default function SettingsPanel({ children }: SettingsPanelOptions) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          {/* Toggle Button */}
          <DisclosureButton className="ml-auto mr-2 mb-2 bg-cyan-400 text-white px-2 py-2 rounded hover:bg-cyan-500 transition-all flex items-center justify-center mb-4">
            <AdjustmentsVerticalIcon className="h-5 w-5" />
          </DisclosureButton>

          {/* Animated Panel */}
          <AnimatePresence initial={false}>
            {open && (
              <DisclosurePanel
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-zinc-200 dark:bg-zinc-800 rounded-md">
                  {children}
                </div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
