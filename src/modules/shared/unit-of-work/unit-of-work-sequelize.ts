import { Sequelize, Transaction } from 'sequelize';
import { IUnitOfWork } from './unit-of-work';

export class UnitOfWorkSequelize implements IUnitOfWork {
  private transaction: Transaction | null;

  constructor(private sequelize: Sequelize) {}

  async commit(): Promise<void> {
    await this.transaction!.commit();
    this.transaction = null;
  }

  async rollback(): Promise<void> {
    await this.transaction!.rollback();
    this.transaction = null;
  }

  getTransaction() {
    return this.transaction;
  }

  async start(): Promise<void> {
    if (!this.transaction) {
      this.transaction = await this.sequelize.transaction();
    }
  }

  async run<T>(workFn: (uow: IUnitOfWork) => Promise<T>): Promise<T> {
    try {
      await this.start();
      const result = await workFn(this);
      await this.commit();
      return result;
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }
}
