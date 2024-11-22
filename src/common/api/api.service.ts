import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('app.apiUrl')!;
  }

  async get<T>(endpoint: string): Promise<T> {
    const token: string = this.configService.get<string>('app.apiToken')!;
    const response = await lastValueFrom(
      this.httpService.get<T>(`${this.apiUrl}${endpoint}`, {
        headers: {
          Authorization: token,
        },
      }),
    );

    return response.data;
  }
}
