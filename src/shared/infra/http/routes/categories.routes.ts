import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http//middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({dest: './tmp'})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/', 
  ensureAuthenticated, 
  ensureAdmin, 
  importCategoryController.handle
  );

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
    '/import', 
    ensureAuthenticated, 
    ensureAdmin, 
    upload.single("file"), 
    importCategoryController.handle
  );

export { categoriesRoutes };