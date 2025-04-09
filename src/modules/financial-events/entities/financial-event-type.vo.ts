export enum FinancialEventEnum {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export class FinancialEventType {
  public readonly value: FinancialEventEnum;

  constructor(value: FinancialEventEnum) {
    this.value = value;
  }

  static createFromValue(value: string): FinancialEventType {
    const eventType = Object.values(FinancialEventEnum).find(
      (enumValue) => enumValue === value,
    );

    if (!eventType) {
      throw new Error(`Invalid financial event type: ${value}`);
    }

    return new FinancialEventType(value as FinancialEventEnum);
  }

  static createDebit(): FinancialEventType {
    return new FinancialEventType(FinancialEventEnum.DEBIT);
  }

  static createCredit(): FinancialEventType {
    return new FinancialEventType(FinancialEventEnum.CREDIT);
  }
}
