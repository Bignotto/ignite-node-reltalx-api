import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private userTokenRepository: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<User> {
    const user_token = await this.userTokenRepository.findByRefreshToken(token);
    if (!user_token) throw new AppError("Reset password: Invalid token!");

    const isExpired = this.dateProvider.isExpired(user_token.expires_date);
    if (isExpired) throw new AppError("Reset password: Expired token!");

    const user = await this.usersRepository.findById(user_token.user_id);
    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.userTokenRepository.deleteById(user_token.id);

    return user;
  }
}

export { ResetPasswordUseCase };
