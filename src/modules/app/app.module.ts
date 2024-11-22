import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SheetsModule } from 'modules/sheets/sheets.module';
import { environmentConfig } from '~/config/environment.config';
import { environmentConfigSchema } from '~/config/environment.config.schema';
import { ApiModule } from '~/common/api/api.module';
import { ClientsModule } from 'modules/clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfig],
      validate: (config) => {
        const parsed = environmentConfigSchema.safeParse(config);
        if (!parsed.success) {
          throw new Error(`Config validation error: ${parsed.error.message}`);
        }
        return parsed.data;
      },
    }),
    ApiModule,
    ClientsModule,
    SheetsModule,
  ],
})
export class AppModule {}
