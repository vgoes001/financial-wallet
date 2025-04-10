export interface IMessageBroker {
  publish(event: string, data: any): Promise<void>;
}
