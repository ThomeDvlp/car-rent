import { getConnection } from "typeorm";
import {v4 as uuidV4 } from  "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";

async function create(){
  const connection = await createConnection('localhost');
  const id = uuidV4()
  const password = await hash('admin', 8)
  
  await connection.query(
    `INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at) 
    VALUES('${id}', 'admin','admin@carrent.com', '${password}', true, 'qwerqwer','now()')
    `
    );

    connection.close;
  }

  create().then(() => console.log('User admin created successfully'))