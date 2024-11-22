import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { google } from 'googleapis';
import { TClient } from 'modules/clients/types/client.type';

@Injectable()
export class SheetsService {
  constructor(private configService: ConfigService) {}

  async exportClientsDataToSheets(data: TClient[]): Promise<void> {
    const sheetId: string =
      this.configService.get<string>('app.googleSheetId')!;
    const sheets = google.sheets({
      version: 'v4',
      auth: new google.auth.GoogleAuth({
        keyFile: path.join(process.cwd(), 'google-credentials.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      }),
    });
    const values: (string | number)[][] = [
      [
        'id',
        'firstName',
        'lastName',
        'gender',
        'address',
        'city',
        'phone',
        'email',
        'status',
      ],
      ...data.map((client: TClient): (string | number)[] => [
        client.id,
        client.firstName,
        client.lastName,
        client.gender,
        client.address,
        client.city,
        client.phone,
        client.email,
        client.status,
      ]),
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'p1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  }
}
