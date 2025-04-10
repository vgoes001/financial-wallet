export interface EventDispatcherInterface {
  register(event: string, handler: any): void;
  publish(event: string, data: any): Promise<void>;
}
