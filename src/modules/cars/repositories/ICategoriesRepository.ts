import { Category } from "../models/Category";



interface ICreateCategoryDTO{
  name: string;
  description: string;
}

interface ICategoriesRepository{
  findByName(name:string): Category;
  list(): Category[];
  create({name, description}: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };