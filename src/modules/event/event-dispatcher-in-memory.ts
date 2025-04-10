import { EventDispatcherInterface } from './event-dispatcher.interface';

export class EventDispatcherFake implements EventDispatcherInterface {
  private events = new Map<string, any[]>();

  register(event: string, handler: any): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(handler);
  }
  async publish(event: string, data: any): Promise<void> {
    const handlers = this.events.get(event);
    if (handlers) {
      for (const handler of handlers) {
        await handler(data);
      }
    }
  }
}
