import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn()
  id?: string;    

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;  

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  admin: boolean;

  @Column()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
};

export { User };