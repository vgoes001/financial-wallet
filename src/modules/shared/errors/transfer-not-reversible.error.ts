export class TransferNotReversibleError extends Error {
  constructor() {
    super('Transfer is not reversible');
    this.name = 'TransferNotReversibleError';
  }
}
