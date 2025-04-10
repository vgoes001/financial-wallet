import { Module } from '@nestjs/common';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('RABBITMQ_URI') as string,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'MessageBroker',
      useFactory: (amqpConnection: AmqpConnection) => {
        return new RabbitMQService(amqpConnection);
      },
      inject: [AmqpConnection],
    },
  ],
  exports: [
    {
      provide: 'MessageBroker',
      useFactory: (amqpConnection: AmqpConnection) => {
        return new RabbitMQService(amqpConnection);
      },
      inject: [AmqpConnection],
    },
  ],
})
export class RabbitmqModule {}
