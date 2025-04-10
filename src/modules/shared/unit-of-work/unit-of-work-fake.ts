import { IUnitOfWork } from './unit-of-work';

export class UnitOfWorkFake implements IUnitOfWork {
  async start(): Promise<void> {}

  async commit(): Promise<void> {}

  async rollback(): Promise<void> {}

  getTransaction() {}

  run<T>(workFn: (uow: IUnitOfWork) => Promise<T>): Promise<T> {
    return workFn(this);
  }
}
