import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository, ICreateUserDTO };
