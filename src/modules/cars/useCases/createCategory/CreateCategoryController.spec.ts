import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

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
    await connection.dropDatabase();
    await connection.close();
  })

  it('It should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@carrent.com',
      password: 'admin'
    });

    const { token } = await responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: 'Category Supertest',
        description: 'TestDescriptions'
    })
    .set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });
});
