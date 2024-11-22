import { Injectable } from '@nestjs/common';
import { ApiService } from '~/common/api/api.service';
import { TClient } from 'modules/clients/types/client.type';

@Injectable()
export class ClientsService {
  constructor(private readonly apiService: ApiService) {}

  async getClients(): Promise<TClient[]> {
    return this.apiService.get<TClient[]>('/clients');
  }
}
