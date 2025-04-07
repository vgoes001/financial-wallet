import { randomUUID } from 'node:crypto';

export type UserConstructorProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

export type UserCreateProps = {
  name: string;
  email: string;
  password: string;
}


export class User{
  id: string;

  name: string;

  email: string;

  password: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor({ email, name, password, id, createdAt, deletedAt, updatedAt }: UserConstructorProps){
    this.email = email;
    this.name = name;
    this.password = password;
    this.id = id ?? randomUUID();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static create(props: UserCreateProps){
    return new User(props);
  }

}