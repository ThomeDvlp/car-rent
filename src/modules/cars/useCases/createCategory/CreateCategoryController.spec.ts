import { hash } from 'bcryptjs';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from "@shared/infra/typeorm"

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async() => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8)
  
    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", driver_license, created_at) 
      VALUES('${id}', 'admin','admin@carrent.com', '${password}', true, 'XXXXXX','now()')
      `
    );
  });

  afterAll( async ()=>{
    // await connection.dropDatabase();
    await connection.close();
  })

  it('It should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@carrent.com',
      password: 'admin'
    });

    console.log(responseToken.body);

    const response = await request(app).post("/categories").send({
      name: 'Category Supertest',
      description: 'TestDescriptions'
    });

    expect(response.status).toBe(201);
  });
});
