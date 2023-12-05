import Email from '../shared/email';

export class Customer {
  constructor(readonly name: string, readonly email: Email, readonly birthday: Date) {}
}
