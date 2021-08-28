import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const newUser = await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
    return newUser;
  }
}

export { CreateUserUseCase };
