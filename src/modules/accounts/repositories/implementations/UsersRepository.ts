import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const { name, username, email, driver_license, password } = data;

    const newUser = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password,
    });

    await this.repository.save(newUser);

    return newUser;
  }

  async list(): Promise<User[]> {
    const userList = await this.repository.find();
    return userList;
  }
}

export { UsersRepository };
