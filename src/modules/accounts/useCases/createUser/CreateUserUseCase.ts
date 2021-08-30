import { hash } from "bcrypt";
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
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const found = this.usersRepository.findByEmail(email);
    if (found) throw new Error("E-Mail address already in use.");

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
