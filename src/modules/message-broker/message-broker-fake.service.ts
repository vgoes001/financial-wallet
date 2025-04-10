import { IMessageBroker } from './message-broker.interface';

export class MessageBrokerFakeService implements IMessageBroker {
  async publish(event: string, data: any): Promise<void> {}
}
