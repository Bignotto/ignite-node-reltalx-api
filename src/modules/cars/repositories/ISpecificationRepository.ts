import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findById(id: string): Promise<Specification> | undefined;
  findByName(name: string): Promise<Specification> | undefined;
  list(): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
