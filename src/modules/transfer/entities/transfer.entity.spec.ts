import { FinancialEventEnum } from '../../financial-events/entities/financial-event-type.vo';
import { TransferStatusEnum, TransferStatusVO } from './transfer-status.vo';
import { Transfer } from './transfer.entity';

describe('TransferEntity', () => {
  describe('constructor', () => {
    it('should create an instance of TransferEntity', () => {
      const transfer = new Transfer({
        amount: 10,
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        status: TransferStatusVO.createInProgress(),
        transferDate: new Date(),
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      expect(transfer).toBeDefined();
      expect(transfer).toBeInstanceOf(Transfer);
      expect(transfer.amount).toBe(10);
      expect(transfer.receiverId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');
      expect(transfer.senderId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');
      expect(transfer.status.value).toBe(TransferStatusEnum.IN_PROGRESS);
      expect(transfer.id).toBeDefined();
    });

    it('should create an instance of TransferEntity with status completed', () => {
      const transfer = new Transfer({
        amount: 10,
        status: TransferStatusVO.createCompleted(),
        transferDate: new Date(),
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      expect(transfer).toBeDefined();
      expect(transfer).toBeInstanceOf(Transfer);
      expect(transfer.amount).toBe(10);
      expect(transfer.receiverId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');
      expect(transfer.senderId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');
      expect(transfer.status.value).toBe(TransferStatusEnum.COMPLETED);
      expect(transfer.id).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a transfer with default values', () => {
      const transfer = Transfer.create({
        amount: 10,
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      expect(transfer).toBeDefined();
      expect(transfer).toBeInstanceOf(Transfer);
      expect(transfer.amount).toBe(10);
      expect(transfer.receiverId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');
      expect(transfer.senderId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');
      expect(transfer.status.value).toBe(TransferStatusEnum.IN_PROGRESS);
      expect(transfer.id).toBeDefined();
      expect(transfer.transferDate).toBeDefined();
    });

    it('should throw an error if amount is less than or equal to zero', () => {
      expect(() => {
        Transfer.create({
          amount: 0,
          receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
          senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
        });
      }).toThrow('Amount must be greater than 0');
    });
  });

  describe('createFinancialEvents', () => {
    it('should create financial events', () => {
      const transfer = new Transfer({
        amount: 10,
        status: TransferStatusVO.createCompleted(),
        transferDate: new Date(),
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      const events = transfer.createFinancialEvents();

      expect(events).toBeDefined();
      expect(events.length).toBe(2);

      const creditEvent = events.find(
        (event) => event.type.value === FinancialEventEnum.CREDIT,
      );
      const debitEvent = events.find(
        (event) => event.type.value === FinancialEventEnum.DEBIT,
      );

      expect(creditEvent).toBeDefined();
      expect(creditEvent!.amount).toBe(10);
      expect(creditEvent.userId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');

      expect(debitEvent).toBeDefined();
      expect(debitEvent!.amount).toBe(10);
      expect(debitEvent.userId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');
    });

    it('should create financial events reversed', () => {
      const transfer = new Transfer({
        amount: 10,
        status: TransferStatusVO.createRefunded(),
        transferDate: new Date(),
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      const events = transfer.createReversedFinancialEvents();

      expect(events).toBeDefined();
      expect(events.length).toBe(2);

      const creditEvent = events.find(
        (event) => event.type.value === FinancialEventEnum.CREDIT,
      );
      const debitEvent = events.find(
        (event) => event.type.value === FinancialEventEnum.DEBIT,
      );

      expect(creditEvent).toBeDefined();
      expect(creditEvent!.amount).toBe(10);
      expect(creditEvent.userId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');

      expect(debitEvent).toBeDefined();
      expect(debitEvent!.amount).toBe(10);
      expect(debitEvent.userId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');
    });
  });

  describe('isReversible', () => {
    it('should return true if transfer is reversible', () => {
      const transfer = new Transfer({
        amount: 10,
        status: TransferStatusVO.createCompleted(),
        transferDate: new Date(),
        createdAt: new Date(),
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      expect(transfer.isReversible()).toBe(true);
    });

    it('should return false if transfer was created after 24 hours', () => {
      const transfer = new Transfer({
        amount: 10,
        status: TransferStatusVO.createCompleted(),
        transferDate: new Date(Date.now() - 25 * 60 * 60 * 1000),
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });

      expect(transfer.isReversible()).toBe(false);
    });
  });
});
