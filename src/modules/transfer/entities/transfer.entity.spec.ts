import { TransferStatusEnum, TransferStatusVO } from "./transfer-status.vo";
import { Transfer } from "./transfer.entity";



describe('TransferEntity', () => {
  describe('constructor', () => {

    it('should create an instance of TransferEntity', () => {
      const transfer = new Transfer({
        amount: 10,
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      })

      expect(transfer).toBeDefined();
      expect(transfer).toBeInstanceOf(Transfer);
      expect(transfer.amount).toBe(10);
      expect(transfer.receiverId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');
      expect(transfer.senderId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');
      expect(transfer.status.value).toBe(TransferStatusEnum.IN_PROGRESS)
      expect(transfer.id).toBeDefined();
    })


    it('should create an instance of TransferEntity with status completed', () => {
      const transfer = new Transfer({
        amount: 10,
        status: TransferStatusVO.createCompleted(),
        receiverId: 'a3872d5f-7ce5-402a-9a87-ffb6b306b5c2',
        senderId: 'd11a8539-b84c-4b50-84dc-5eee8278358c',
      })

      expect(transfer).toBeDefined();
      expect(transfer).toBeInstanceOf(Transfer);
      expect(transfer.amount).toBe(10);
      expect(transfer.receiverId).toBe('a3872d5f-7ce5-402a-9a87-ffb6b306b5c2');
      expect(transfer.senderId).toBe('d11a8539-b84c-4b50-84dc-5eee8278358c');
      expect(transfer.status.value).toBe(TransferStatusEnum.COMPLETED)
      expect(transfer.id).toBeDefined();
    });
  })
})