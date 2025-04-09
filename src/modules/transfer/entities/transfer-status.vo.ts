export enum TransferStatusEnum {
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  IN_PROGRESS = 'in_progress',
}

export class TransferStatusVO {
  public readonly value: TransferStatusEnum;

  constructor(value: TransferStatusEnum) {
    this.value = value;
  }

  static createFromValue(value: string): TransferStatusVO {
    const status = Object.values(TransferStatusEnum).find(
      (enumValue) => enumValue === value,
    );

    if (!status) {
      throw new Error(`Invalid transfer status: ${value}`);
    }

    return new TransferStatusVO(status as TransferStatusEnum);
  }

  static createCompleted(): TransferStatusVO {
    return new TransferStatusVO(TransferStatusEnum.COMPLETED);
  }

  static createFailed(): TransferStatusVO {
    return new TransferStatusVO(TransferStatusEnum.FAILED);
  }

  static createCancelled(): TransferStatusVO {
    return new TransferStatusVO(TransferStatusEnum.CANCELLED);
  }

  static createRefunded(): TransferStatusVO {
    return new TransferStatusVO(TransferStatusEnum.REFUNDED);
  }

  static createInProgress(): TransferStatusVO {
    return new TransferStatusVO(TransferStatusEnum.IN_PROGRESS);
  }
}
