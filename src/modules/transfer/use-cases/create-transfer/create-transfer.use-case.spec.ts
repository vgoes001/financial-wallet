import { IUserRepository } from '../../../user/repository/user-repository';
import { ITransferRepository } from '../../repository/transfer-repository';
import { CreateTransferUseCase } from './create-transfer.use-case';
import { UserInMemoryRepository } from '../../../user/repository/in-memory/user-in-memory.repository';
import { TransferInMemoryRepository } from '../../repository/in-memory/transfer-in-memory.repository';
import { User } from '../../../user/entities/user.entity';
import { TransferToSelfError } from '../../../shared/errors/transfer-to-self.error';
import { NotFoundException } from '@nestjs/common';
import { TransferStatusEnum } from '../../entities/transfer-status.vo';
import { IFinancialEventRepository } from '../../../financial-events/repository/financial-event.repository';
import { CalculateBalanceService } from '../../../financial-events/service/calculate-balance.service';
import { FinancialEventInMemory } from '../../../financial-events/repository/in-memory/financial-event-in-memory';
import { FinancialEvent } from '../../../financial-events/entities/financial-event.entity';
import { FinancialEventType } from '../../../financial-events/entities/financial-event-type.vo';
import { IUnitOfWork } from 'src/modules/shared/unit-of-work/unit-of-work';
import { UnitOfWorkFake } from '../../../shared/unit-of-work/unit-of-work-fake';

describe('CreateTransferUseCase', () => {
  let createTransferUseCase: CreateTransferUseCase;
  let transferRepository: ITransferRepository;
  let userRepository: IUserRepository;
  let financialEventRepository: IFinancialEventRepository;
  let calculateBalanceService: CalculateBalanceService;
  let unitOfWork: IUnitOfWork;

  describe('execute', () => {
    beforeEach(() => {
      userRepository = new UserInMemoryRepository();
      transferRepository = new TransferInMemoryRepository();
      financialEventRepository = new FinancialEventInMemory();
      calculateBalanceService = new CalculateBalanceService();
      unitOfWork = new UnitOfWorkFake();
      createTransferUseCase = new CreateTransferUseCase(
        transferRepository,
        userRepository,
        financialEventRepository,
        calculateBalanceService,
        unitOfWork,
      );
    });

    it('user cannot transfer to self', async () => {
      const senderEmail = 'sender@email.com';
      const sender = new User({
        email: senderEmail,
        password: '123456',
        name: 'Sender',
      });
      await userRepository.create(sender);

      try {
        await createTransferUseCase.execute({
          amount: 10,
          senderId: sender.id,
          receiverKey: senderEmail,
        });
        fail('should have thrown an error');
      } catch (e) {
        expect(e.message).toBe('User cannot transfer to self');
        expect(e).toBeInstanceOf(TransferToSelfError);
      }
    });

    it('should not create a transfer if sender or receiver does not exist', async () => {
      const senderEmail = 'sender@email.com';
      const receiverEmail = 'receiver@email.com';
      const sender = new User({
        email: senderEmail,
        password: '123456',
        name: 'Sender',
      });
      await userRepository.create(sender);

      try {
        await createTransferUseCase.execute({
          amount: 10,
          senderId: sender.id,
          receiverKey: receiverEmail,
        });
        fail('should have thrown an error');
      } catch (e) {
        expect(e.message).toBe('Sender or receiver not found');
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should not create a transfer if balance is insufficient', async () => {
      const senderEmail = 'sender@email.com';
      const receiverEmail = 'receiver@email.com';
      const sender = new User({
        email: senderEmail,
        password: '123456',
        name: 'Sender',
      });

      const receiver = new User({
        email: receiverEmail,
        name: 'Receiver',
        password: '123456',
      });

      await userRepository.create(sender);
      await userRepository.create(receiver);

      try {
        await createTransferUseCase.execute({
          amount: 10,
          senderId: sender.id,
          receiverKey: receiverEmail,
        });
        fail('should have thrown an error');
      } catch (e) {
        expect(e.message).toBe('Insufficient balance');
        expect(e).toBeInstanceOf(Error);
      }
    });

    it('should create a transfer', async () => {
      const senderEmail = 'sender@email.com';
      const receiverEmail = 'receiver@email.com';
      const sender = new User({
        email: senderEmail,
        password: '123456',
        name: 'Sender',
      });

      const receiver = new User({
        email: receiverEmail,
        name: 'Receiver',
        password: '123456',
      });

      const financialEvent = new FinancialEvent({
        type: FinancialEventType.createCredit(),
        amount: 100,
        tranferId: 'transfer-1',
        userId: sender.id,
      });
      await financialEventRepository.create(financialEvent);
      await userRepository.create(sender);
      await userRepository.create(receiver);

      const transferCreated = await createTransferUseCase.execute({
        amount: 10,
        senderId: sender.id,
        receiverKey: receiverEmail,
      });

      expect(transferCreated).toBeDefined();
      expect(transferCreated.id).toBeDefined();
      expect(transferCreated.senderId).toBe(sender.id);
      expect(transferCreated.receiverId).toBe(receiver.id);
      expect(transferCreated.amount).toBe(10);
      expect(transferCreated.status).toBe(TransferStatusEnum.COMPLETED);
    });
  });
});
