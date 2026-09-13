import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/providers';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const metadata: Metadata = {
  title: 'Vertex',
  description: 'Business Management Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}
