import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
