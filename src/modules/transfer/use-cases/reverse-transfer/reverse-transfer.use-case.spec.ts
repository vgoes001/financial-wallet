import { TransferNotReversibleError } from '../../..//shared/errors/transfer-not-reversible.error';
import { TransferInMemoryRepository } from '../../repository/in-memory/transfer-in-memory.repository';
import { ReverseTransferUseCase } from './reverse-transfer.use-case';
import { Transfer } from '../../entities/transfer.entity';
import { TransferStatusVO } from '../../entities/transfer-status.vo';
import { FinancialEventInMemory } from '../../../financial-events/repository/in-memory/financial-event-in-memory';

describe('ReverseTransferUseCase', () => {
  let transferRepository: TransferInMemoryRepository;
  let financialEventRepository: FinancialEventInMemory;
  let reverseTransferUseCase: ReverseTransferUseCase;

  describe('execute', () => {
    beforeEach(() => {
      transferRepository = new TransferInMemoryRepository();
      financialEventRepository = new FinancialEventInMemory();
      reverseTransferUseCase = new ReverseTransferUseCase(
        transferRepository,
        financialEventRepository,
      );
    });

    it('should not allow to reverse a transfer if it is not found', async () => {
      try {
        await reverseTransferUseCase.execute({
          transferId: 'non-existing-transfer-id',
          userId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
        });
        fail('should have thrown an error');
      } catch (e) {
        expect(e.message).toBe('Transfer not found');
      }
    });

    it('should throw TransferNotReversibleError if transfer is not reversible', async () => {
      const transfer = Transfer.create({
        amount: 10,
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
        status: TransferStatusVO.createRefunded(),
      });
      await transferRepository.create(transfer);

      try {
        await reverseTransferUseCase.execute({
          transferId: transfer.id,
          userId: transfer.senderId,
        });
        fail('should have thrown an error');
      } catch (e) {
        expect(e).toBeInstanceOf(TransferNotReversibleError);
      }
    });

    it('should throw UnprocessableEntityException if userId does not match senderId', async () => {
      const transfer = Transfer.create({
        amount: 10,
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });
      await transferRepository.create(transfer);

      try {
        await reverseTransferUseCase.execute({
          transferId: transfer.id,
          userId: 'non-matching-user-id',
        });
        fail('should have thrown an error');
      } catch (e) {
        expect(e.status).toBe(422);
      }
    });

    it('should reverse the transfer and create reversed financial events', async () => {
      const transfer = Transfer.create({
        amount: 10,
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      });
      await transferRepository.create(transfer);

      await reverseTransferUseCase.execute({
        transferId: transfer.id,
        userId: transfer.senderId,
      });

      const updatedTransfer = await transferRepository.findById(transfer.id);
      expect(updatedTransfer.status).toEqual(TransferStatusVO.createRefunded());

      expect(financialEventRepository['financialEvents']).toHaveLength(2);
    });
  });
});
