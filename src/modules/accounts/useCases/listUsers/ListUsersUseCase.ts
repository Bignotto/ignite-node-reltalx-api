import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
