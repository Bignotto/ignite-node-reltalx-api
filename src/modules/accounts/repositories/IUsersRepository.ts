import { User } from "../infra/typeorm/entities/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar?: string;
  id?: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(updatedUser: User): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
