import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private tokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const token = new UserTokens();
    Object.assign(token, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.tokens.push(token);
    return Promise.resolve(token);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const found = this.tokens.find(
      (token) =>
        token.refresh_token === refresh_token && token.user_id === user_id
    );
    return Promise.resolve(found);
  }

  async deleteById(id: string): Promise<void> {
    const filtered = this.tokens.filter((token) => token.id !== id);
    this.tokens = filtered;
    return Promise.resolve();
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const found = this.tokens.find(
      (token) => token.refresh_token === refresh_token
    );
    return Promise.resolve(found);
  }
}

export { UsersTokensRepositoryInMemory };
