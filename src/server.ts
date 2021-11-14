import express from 'express';
import { v4 as uuidV4 } from 'uuid';
import { categoriesRoutes  } from './routes/categories.routes';

const app = express();

app.use(express.json())

app.use("/categories", categoriesRoutes);

app.listen(3333,()=>console.log('Servidor rodando na porta 3333'));