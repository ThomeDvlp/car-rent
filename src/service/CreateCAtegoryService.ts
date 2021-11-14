import { CategoriesRepository } from '../repositories/CategoriesRepository'

interface Irequest {
  name: string;
  description: string;
}

class CreateCategoryService{
  constructor(private categoriesRepository: CategoriesRepository){}

  execute({name, description}: Irequest): void{
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
  if(categoryAlreadyExists){
    throw new Error('error:"Category Already exists!');
  }

  this.categoriesRepository.create ({ name, description });
  }
}

export { CreateCategoryService };