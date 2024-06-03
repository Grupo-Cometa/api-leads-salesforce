import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './core/lead/lead.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { OpportunityModule } from './core/opportunity/opportunity.module';
import { apiKeyMiddleware } from './middlewares/apiKeyAuth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    LeadModule,
    OpportunityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(apiKeyMiddleware).forRoutes('*');
  }
}
