import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IMessageBroker } from './message-broker.interface';

export class RabbitMQService implements IMessageBroker {
  constructor(private amqpConnection: AmqpConnection) {}

  async publish(event: string, data: any): Promise<void> {
    await this.amqpConnection.publish('amq.direct', event, data);
  }
}
