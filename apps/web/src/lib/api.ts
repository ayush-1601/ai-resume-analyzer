import type { HealthCheckResponse } from 'shared-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function fetchHealthCheck(): Promise<HealthCheckResponse> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }

  return response.json() as Promise<HealthCheckResponse>;
}
