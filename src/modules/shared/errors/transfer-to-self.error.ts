export class TransferToSelfError extends Error {
  constructor() {
    super('User cannot transfer to self');
    this.name = 'TransferToSelfError';
  }
}
