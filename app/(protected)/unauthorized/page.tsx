import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Access Denied</h1>
      <p className="text-muted-foreground max-w-sm">
        You don&apos;t have permission to view this page. Contact your administrator
        if you believe this is a mistake.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-foreground hover:text-primary underline-offset-4 hover:underline"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
