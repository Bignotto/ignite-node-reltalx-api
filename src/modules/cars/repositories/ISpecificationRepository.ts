import { Specification } from '../model/Specification';

interface ICreateSpecificationDTO {
  name:string;
  description:string;
}

interface ISpecificationRepository {
  create({ name, description }:ICreateSpecificationDTO):Specification;
  findById(id:string):Specification | undefined;
  findByName(name:string): Specification | undefined;
  list():Specification[];
}

export { ISpecificationRepository, ICreateSpecificationDTO };
