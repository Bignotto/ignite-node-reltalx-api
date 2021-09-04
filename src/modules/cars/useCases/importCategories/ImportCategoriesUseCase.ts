import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategories[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => resolve(categories))
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<Category[]> {
    const categories = await this.loadCategories(file);
    const newCategories: Category[] = [];

    categories.map(async (newCatetogy) => {
      const { name, description } = newCatetogy;
      const foundCategory = await this.categoryRepository.findByName(name);
      if (!foundCategory) {
        const freshCategory = await this.categoryRepository.create({
          name,
          description,
        });
        newCategories.push(freshCategory);
      }
    });
    return newCategories;
  }
}

export { ImportCategoriesUseCase };
