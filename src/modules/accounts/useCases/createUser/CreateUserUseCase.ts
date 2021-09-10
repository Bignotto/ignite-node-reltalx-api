import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const found = await this.usersRepository.findByEmail(email);

    if (found) throw new AppError("E-Mail address already in use.", 400);

    const hashedPassword = await hash(password, 8);

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
    return newUser;
  }
}

export { CreateUserUseCase };
