import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRepository: CategoriesRepository =  new CategoriesRepository();
const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>{
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);
  if(categoryAlreadyExists){
    return res.status(400).json({error:"Category Already exists!"})
  }

  categoriesRepository.create ({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) =>{
  const all = categoriesRepository.list();

  return res.json(all);
})

export { categoriesRoutes };


