import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
    return Promise.resolve(user);
  }
  update(updatedUser: User): Promise<User> {
    const newUsersArray = this.users.filter(
      (user) => user.id !== updatedUser.id
    );
    const userToUpdate = new User();
    Object.assign(userToUpdate, {
      id: updatedUser.id,
      name: updatedUser.name,
      password: updatedUser.password,
      email: updatedUser.email,
      driver_license: updatedUser.driver_license,
    });

    newUsersArray.push(userToUpdate);
    this.users = newUsersArray;
    return Promise.resolve(userToUpdate);
  }
  async list(): Promise<User[]> {
    return this.users;
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  users: User[] = [];
}

export { UsersRepositoryInMemory };
