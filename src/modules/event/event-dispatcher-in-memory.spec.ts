import { EventDispatcherFake } from './event-dispatcher-in-memory';

describe('EventDispatcherFake', () => {
  it('should register and publish events', async () => {
    const eventDispatcher = new EventDispatcherFake();
    const mockHandler = jest.fn();

    eventDispatcher.register('test.event', mockHandler);

    await eventDispatcher.publish('test.event', { data: 'test' });

    expect(mockHandler).toHaveBeenCalledWith({ data: 'test' });
  });
});
