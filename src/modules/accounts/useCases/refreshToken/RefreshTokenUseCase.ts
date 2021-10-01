import { verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
}

class RefreshToken {
  constructor(
    @inject("UsersTokensRepository")
    private userTokenRepository: IUsersTokensRepository
  ) {}

  async execute(refresh_token: string) {
    const decode = verify(refresh_token, auth.secret_refresh_token) as IPayload;
    const user_id = decode.sub;

    // const user_token = await this.userTokenRepository.
  }
}
