'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LoaderCircleIcon } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const OTP_LENGTH = 6;

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem('ValidationEmail');
    if (!storedEmail) {
      router.replace('/reset-password');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  async function handleVerify() {
    if (otp.length < OTP_LENGTH || !email) return;

    setIsVerifying(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/VerifyForgetCode`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, verificationCode: otp }),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { message?: string };
        setError(data.message ?? 'Invalid verification code. Please try again.');
        setOtp('');
        return;
      }

      const data = await res.json() as { resetToken?: string };
      if (!data.resetToken) {
        setError('Unexpected response from server. Please try again.');
        return;
      }

      localStorage.setItem('ResetToken', data.resetToken);
      toast.success('Code verified! Set your new password.');
      router.push('/change-password');
    } catch {
      setError('Service unavailable. Please try again later.');
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    if (!email || isResending || resendCooldown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/ResendVerificationCode`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { message?: string };
        toast.error(data.message ?? 'Failed to resend code. Please try again.');
        return;
      }

      toast.success('A new verification code has been sent to your inbox.');
      setOtp('');
      setResendCooldown(60);
    } catch {
      toast.error('Service unavailable. Please try again later.');
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="block w-full space-y-5">
      <div className="text-center space-y-1 pb-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to{' '}
          <span className="font-medium text-foreground">{email ?? '…'}</span>
        </p>
      </div>

      {error && (
        <Alert variant="destructive" onClose={() => setError(null)}>
          <AlertIcon>
            <AlertCircle />
          </AlertIcon>
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-4">
        <InputOTP
          maxLength={OTP_LENGTH}
          value={otp}
          onChange={setOtp}
          disabled={isVerifying}
        >
          <InputOTPGroup>
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="size-12 text-lg" />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <p className="text-xs text-muted-foreground">
          Enter the 6-digit code from your email
        </p>
      </div>

      <Button
        type="button"
        className="w-full"
        disabled={otp.length < OTP_LENGTH || isVerifying}
        onClick={handleVerify}
      >
        {isVerifying ? (
          <LoaderCircleIcon className="size-4 animate-spin" />
        ) : null}
        Verify Code
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{' '}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || resendCooldown > 0}
          className="text-primary font-medium underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? (
            'Sending…'
          ) : resendCooldown > 0 ? (
            `Resend in ${resendCooldown}s`
          ) : (
            'Resend'
          )}
        </button>
      </div>

      <Button type="button" variant="outline" className="w-full" asChild>
        <Link href="/reset-password">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </Button>
    </div>
  );
}
