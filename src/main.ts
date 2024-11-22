import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { SheetsService } from 'modules/sheets/sheets.service';
import { ClientsService } from 'modules/clients/clients.service';
import { TClient } from 'modules/clients/types/client.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = <number>configService.get<number>('app.port');

  const clientsService: ClientsService = app.get(ClientsService);
  const sheetsService: SheetsService = app.get(SheetsService);

  const clients: TClient[] = await clientsService.getClients();
  await sheetsService.exportClientsDataToSheets(clients);

  await app.listen(port);
}
void bootstrap();
