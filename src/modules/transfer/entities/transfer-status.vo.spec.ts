import { TransferStatusEnum, TransferStatusVO } from './transfer-status.vo';

describe('TransferStatus', () => {
  it('should create an instance of TransferStatus with valid value', () => {
    const transferStatus = TransferStatusVO.createFromValue('completed');
    expect(transferStatus).toBeInstanceOf(TransferStatusVO);
    expect(transferStatus.value).toBe(TransferStatusEnum.COMPLETED);
  });

  it('should create an instance of TransferStatus with value completed', () => {
    const transferStatus = TransferStatusVO.createCompleted();
    expect(transferStatus).toBeInstanceOf(TransferStatusVO);
    expect(transferStatus.value).toBe(TransferStatusEnum.COMPLETED);
  });

  it('should create an instance of TransferStatus with value failed', () => {
    const transferStatus = TransferStatusVO.createFailed();
    expect(transferStatus).toBeInstanceOf(TransferStatusVO);
    expect(transferStatus.value).toBe(TransferStatusEnum.FAILED);
  });

  it('should create an instance of TransferStatus with value cancelled', () => {
    const transferStatus = TransferStatusVO.createCancelled();
    expect(transferStatus).toBeInstanceOf(TransferStatusVO);
    expect(transferStatus.value).toBe(TransferStatusEnum.CANCELLED);
  });

  it('should create an instance of TransferStatus with value refunded', () => {
    const transferStatus = TransferStatusVO.createRefunded();
    expect(transferStatus).toBeInstanceOf(TransferStatusVO);
    expect(transferStatus.value).toBe(TransferStatusEnum.REFUNDED);
  });

  it('should create an instance of TransferStatus with value in_progress', () => {
    const transferStatus = TransferStatusVO.createInProgress();
    expect(transferStatus).toBeInstanceOf(TransferStatusVO);
    expect(transferStatus.value).toBe(TransferStatusEnum.IN_PROGRESS);
  });
});
