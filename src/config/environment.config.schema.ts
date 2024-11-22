import { z } from 'zod';

export const environmentConfigSchema = z.object({
  APP_PORT: z
    .string()
    .transform(Number)
    .refine((port) => port > 0, {
      message: 'APP_PORT must be a positive number',
    }),
  GOOGLE_SHEET_ID: z.string().min(1, 'GOOGLE_SHEET_ID is required'),
  API_TOKEN: z.string().min(1, 'API_TOKEN is required'),
  API_URL: z.string().min(1, 'API_URL is required'),
});
