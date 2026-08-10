'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchHealthCheck } from '@/lib/api';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const demoFormSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

export default function HomePage() {
  const { apiChecked, setApiChecked } = useAppStore();

  const {
    data: health,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealthCheck,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (health?.status === 'ok') {
      setApiChecked(true);
    }
  }, [health, setApiChecked]);

  const onSubmit = (_data: DemoFormValues) => {
    refetch();
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AI Resume Analyzer</CardTitle>
          <CardDescription>
            Monorepo scaffold — health check round trip
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border p-4">
            <p className="mb-2 text-sm font-medium">API Health Check</p>
            {isLoading && (
              <p className="text-sm text-muted-foreground">Checking API…</p>
            )}
            {isError && (
              <p className="text-sm text-destructive">
                {(error as Error).message}
              </p>
            )}
            {health && (
              <p className="text-sm">
                Status:{' '}
                <span className="font-mono font-semibold text-green-600">
                  {health.status}
                </span>
              </p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Zustand store: apiChecked = {String(apiChecked)}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-sm font-medium">
              React Hook Form + Zod (demo)
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Re-check API Health
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
