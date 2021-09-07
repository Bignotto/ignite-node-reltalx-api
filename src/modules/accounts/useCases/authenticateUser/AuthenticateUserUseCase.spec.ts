import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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
