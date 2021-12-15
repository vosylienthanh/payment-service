import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './configs/config.module';
import { ConfigService } from './configs/config.services';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { ProcessOrdersController } from './modules/process-orders/process-orders.controller';
import { ProcessOrdersModule } from './modules/process-orders/process-orders.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.MONGO_URI,
        };
      },
    }),
    ProcessOrdersModule,
  ],
  providers: [ConfigService],
  controllers: [ProcessOrdersController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
