import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export type TEnvironmentConfig = {
  port: number;
  googleSheetId: string;
  apiToken: string;
  apiUrl: string;
};

export const environmentConfig = registerAs(
  'app',
  (): TEnvironmentConfig => ({
    port: Number(process.env.APP_PORT),
    googleSheetId: process.env.GOOGLE_SHEET_ID!,
    apiToken: process.env.API_TOKEN!,
    apiUrl: process.env.API_URL!,
  }),
);
