import { Specification } from '../../model/Specification';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specificationsData: Specification[];

  private static INSTANCE: SpecificationRepository;

  constructor() {
    this.specificationsData = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }:ICreateSpecificationDTO):Specification {
    const newSpecification = new Specification();
    Object.assign(newSpecification, { name, description });

    this.specificationsData.push(newSpecification);
    return newSpecification;
  }

  findById(id:string): Specification | undefined {
    const found = this.specificationsData.find((cat) => cat.id === id);
    return found;
  }

  findByName(name:string): Specification | undefined {
    const found = this.specificationsData.find((cat) => cat.name === name);
    return found;
  }

  list():Specification[] {
    return this.specificationsData;
  }
}

export { SpecificationRepository };
