import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { ICreateUserDTO } from "@modules/accounts/repositories/IUsersRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepository,
      dateProvider
    );
  });

  it("should be able to authenticate user with email and password", async () => {
    const testData: ICreateUserDTO = {
      name: "Test User",
      email: "test@test.com",
      password: "abcde",
      driver_license: "0102030405",
    };

    await createUserUseCase.execute(testData);

    const result = await authenticateUserUseCase.execute({
      email: "test@test.com",
      password: "abcde",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate user with non-existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong@wrong.com",
        password: "abcde",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    expect(async () => {
      const testData: ICreateUserDTO = {
        name: "Test User",
        email: "test@test.com",
        password: "abcde",
        driver_license: "0102030405",
      };

      await createUserUseCase.execute(testData);
      await authenticateUserUseCase.execute({
        email: "test@test.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
