import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const usersList = await this.usersRepository.list();
    return usersList;
  }
}

export { ListUsersUseCase };
