import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from "@shared/infra/typeorm"

let connection: Connection;
describe('List Categories Controller', () => {
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
  });

  it('It should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@carrent.com',
      password: 'admin'
    });

    const { token } = await responseToken.body

    await request(app)
      .post("/categories")
      .send({
        name: 'Category Supertest',
        description: 'TestDescriptions'
    })
    .set({
      Authorization: `Bearer ${token}`,
    });

    const response = await request(app).get("/categories");

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  })
});
