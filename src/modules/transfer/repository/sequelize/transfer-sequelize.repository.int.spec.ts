import { Sequelize } from 'sequelize-typescript';
import { TransferSequelizeRepository } from './transfer-sequelize.repository';
import { TransferModel } from './transfer.model';
import { Transfer } from '../../entities/transfer.entity';
import {
  TransferStatusEnum,
  TransferStatusVO,
} from '../../entities/transfer-status.vo';
import { UnitOfWorkSequelize } from '../../../shared/unit-of-work/unit-of-work-sequelize';

describe('TransferSequelizeRepository', () => {
  let dbConnection: Sequelize;
  let transferRepository: TransferSequelizeRepository;
  let unitOfWorkSequelize: UnitOfWorkSequelize;

  beforeAll(async () => {
    dbConnection = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [TransferModel],
    });
  });

  beforeEach(async () => {
    await dbConnection.sync({
      force: true,
    });
    unitOfWorkSequelize = new UnitOfWorkSequelize(dbConnection);
    transferRepository = new TransferSequelizeRepository(
      TransferModel,
      unitOfWorkSequelize,
    );
  });

  afterAll(async () => {
    await dbConnection.close();
  });

  it('should create a transfer', async () => {
    const transfer = new Transfer({
      amount: 10,
      receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
      status: TransferStatusVO.createInProgress(),
      transferDate: new Date(),
      senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
    });

    const createdTransfer = await transferRepository.create(transfer);
    expect(createdTransfer).toBeDefined();
    expect(createdTransfer).toBeInstanceOf(Transfer);
    expect(createdTransfer.id).toBeDefined();
    expect(createdTransfer.amount).toBe(10);
    expect(createdTransfer.receiverId).toBe(
      'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
    );
    expect(createdTransfer.senderId).toBe(
      'd11a8539-b84c-4b50-84dc-5eee8278358c',
    );
    expect(createdTransfer.status.value).toBe(TransferStatusEnum.IN_PROGRESS);
  });

  it('should find a transfer by id', async () => {
    const transfer = new Transfer({
      amount: 10,
      receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
      status: TransferStatusVO.createInProgress(),
      transferDate: new Date(),
      senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
    });

    const createdTransfer = await transferRepository.create(transfer);
    const foundTransfer = await transferRepository.findById(createdTransfer.id);
    expect(foundTransfer).toBeDefined();
    expect(foundTransfer).toBeInstanceOf(Transfer);
    expect(foundTransfer.id).toBe(createdTransfer.id);
  });
});
