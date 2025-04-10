import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventDispatcherInterface } from './event-dispatcher.interface';

export class EventDispatcher implements EventDispatcherInterface {
  private static instance: EventDispatcher;

  private constructor(private eventEmitter: EventEmitter2) {}

  static getInstance(eventEmitter: EventEmitter2): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher(eventEmitter);
    }
    return EventDispatcher.instance;
  }

  register(event: string, handler: any) {
    this.eventEmitter.on(event, handler);
  }

  async publish(event: string, data: any) {
    await this.eventEmitter.emitAsync(event, data);
  }
}
