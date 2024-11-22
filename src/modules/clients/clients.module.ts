import { ApiModule } from '~/common/api/api.module';
import { Module } from '@nestjs/common';
import { ClientsService } from 'modules/clients/clients.service';

@Module({
  imports: [ApiModule],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
