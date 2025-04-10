export interface IUnitOfWork {
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getTransaction(): any;
  run<T>(workFn: (uow: IUnitOfWork) => Promise<T>): Promise<T>;
}
