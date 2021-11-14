import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../service/CreateCAtegoryService';

const categoriesRepository: CategoriesRepository =  new CategoriesRepository();
const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>{
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({name, description});

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) =>{
  const all = categoriesRepository.list();

  return res.json(all);
})

export { categoriesRoutes };


