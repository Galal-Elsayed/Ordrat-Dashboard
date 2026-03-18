'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import {
  ChangePasswordSchemaType,
  getChangePasswordSchema,
} from '../forms/change-password-schema';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(getChangePasswordSchema()),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem('ValidationEmail');
    const storedToken = localStorage.getItem('ResetToken');

    if (!storedEmail || !storedToken) {
      router.replace('/reset-password');
      return;
    }

    setEmail(storedEmail);
    setResetToken(storedToken);
  }, [router]);

  async function onSubmit(values: ChangePasswordSchemaType) {
    if (!email || !resetToken) return;

    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/ResetPassword`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            newPassword: values.newPassword,
            resetToken,
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { message?: string };
        setError(data.message ?? 'Failed to reset password. Please try again.');
        return;
      }

      // Clean up localStorage
      localStorage.removeItem('ValidationEmail');
      localStorage.removeItem('ResetToken');

      toast.success('Password reset successfully! Please sign in.');
      router.push('/signin');
    } catch {
      setError('Service unavailable. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  }

  // Don't render the form until localStorage is read
  if (!email || !resetToken) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-4"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Set New Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below.
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

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter new password"
                    disabled={isProcessing}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                >
                  {passwordVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={passwordConfirmationVisible ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    disabled={isProcessing}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() =>
                    setPasswordConfirmationVisible(!passwordConfirmationVisible)
                  }
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={
                    passwordConfirmationVisible
                      ? 'Hide password confirmation'
                      : 'Show password confirmation'
                  }
                >
                  {passwordConfirmationVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing && (
            <LoaderCircleIcon className="size-4 animate-spin" />
          )}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
