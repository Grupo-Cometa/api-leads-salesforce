import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './core/lead/lead.module';
import { ConfigModule } from '@nestjs/config';
import { OpportunityModule } from './opportunity/opportunity.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    LeadModule,
    OpportunityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
