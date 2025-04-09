import { IUserRepository } from '../../user/repository/user-repository';
import { ITransferRepository } from '../repository/transfer-repository';
import { CreateTransferUseCase } from './create-transfer.use-case';
import { UserInMemoryRepository } from '../../user/repository/in-memory/user-in-memory.repository';
import { TransferInMemoryRepository } from '../repository/in-memory/transfer-in-memory.repository';
import { User } from '../../user/entities/user.entity';
import { TransferToSelfError } from '../../shared/errors/transfer-to-self.error';
import { NotFoundException } from '@nestjs/common';
import { TransferStatusEnum } from '../entities/transfer-status.vo';

describe('CreateTransferUseCase', () => {
  let createTransferUseCase: CreateTransferUseCase;
  let transferRepository: ITransferRepository;
  let userRepository: IUserRepository;
  describe('execute', () => {
    beforeEach(() => {
      userRepository = new UserInMemoryRepository();
      transferRepository = new TransferInMemoryRepository();
      createTransferUseCase = new CreateTransferUseCase(
        transferRepository,
        userRepository,
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
