import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendResetPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private tokensRepository: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Password reset: User not found.");

    const token = uuidv4();

    const expires = this.dateProvider.addHours(this.dateProvider.now(), 3);

    await this.tokensRepository.create({
      refresh_token: token,
      expires_date: expires,
      user_id: user.id,
    });

    await this.mailProvider.sendMail(
      user.email,
      "noreply@rentalx.com",
      "Your recovery link",
      `Your link is here: ${token}`
    );
  }
}

export { SendResetPasswordEmailUseCase };
