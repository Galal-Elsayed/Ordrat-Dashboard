'use client';

import { useSession } from 'next-auth/react';
import { ScreenLoader } from '@/components/common/screen-loader';
import { Demo1Layout } from '../components/layouts/demo1/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Route protection is handled server-side by proxy.ts.
  // This layout only manages the loading state and layout rendering.
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <ScreenLoader />;
  }

  // Fallback safety net: proxy.ts should have redirected unauthenticated
  // users before reaching here, but this prevents rendering protected
  // content in edge cases (e.g. JS-disabled environments).
  return session ? <Demo1Layout>{children}</Demo1Layout> : null;
}
