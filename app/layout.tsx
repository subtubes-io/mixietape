import '@/styles/tailwind.css';
import type React from 'react';
import { ApplicationLayout } from './application-layout';
import Toast from '@/components/custom/Toast';

export const metadata: Metadata = {
  title: {
    template: '%s - Dashboard',
    default: 'Dashboard',
  },
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ApplicationLayout>
          <Toast />
          {children}
        </ApplicationLayout>
      </body>
    </html>
  );
}
