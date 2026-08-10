import type { HealthCheckResponse } from 'shared-types';

export function getHealthStatus(): HealthCheckResponse {
  return { status: 'ok' };
}
