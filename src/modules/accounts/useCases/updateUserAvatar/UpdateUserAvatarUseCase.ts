import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

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

    if (user.avatar) await deleteFile(`./tmp/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
