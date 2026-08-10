export interface HealthCheckResponse {
  status: 'ok';
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
