import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

export const config = {
  port: parseInt(optionalEnv('PORT', '3001'), 10),
  databaseUrl: requireEnv('DATABASE_URL'),
  openaiApiKey: optionalEnv('OPENAI_API_KEY'),
  aws: {
    accessKeyId: optionalEnv('AWS_ACCESS_KEY_ID'),
    secretAccessKey: optionalEnv('AWS_SECRET_ACCESS_KEY'),
    bucketName: optionalEnv('AWS_BUCKET_NAME'),
  },
  jwt: {
    accessSecret: optionalEnv('JWT_ACCESS_SECRET'),
    refreshSecret: optionalEnv('JWT_REFRESH_SECRET'),
  },
} as const;
