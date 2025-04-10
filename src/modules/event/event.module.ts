import { Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { EventDispatcher } from './event-dispatcher';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: EventDispatcher,
      useFactory: (eventEmitter) => EventDispatcher.getInstance(eventEmitter),
      inject: [EventEmitter2],
    },
    {
      provide: 'EventDispatcher',
      useExisting: EventDispatcher,
    },
  ],
  exports: [
    EventDispatcher,
    {
      provide: 'EventDispatcher',
      useExisting: EventDispatcher,
    },
  ],
})
export class EventModule {}
