import { CategoriesRepositoryInMemory } from "../../repositories/implementations/in-memory/CategoriesRepositoyInMemory"
import { AppError } from "../../../../errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('shoul be able to create a new category', async () => {  
    const category = {name: 'test category', description: 'test description'}
    await createCategoryUseCase.execute (category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });
  it('shoul not be able to create categories with the same name', async () => {  
    expect(async ()=> {
      const category = {name: 'test category', description: 'test description'}
      await createCategoryUseCase.execute (category);
      await createCategoryUseCase.execute (category);
    }).rejects.toBeInstanceOf(AppError);
  });
});