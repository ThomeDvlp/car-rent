import { v4 as uuidV4 } from 'uuid';    
// import {Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

// @Entity('rentals')
class Rental {
  // @PrimaryColumn()
  id?: string;

  // @Column()
  car_id: string;

  // @Column()
  user_id: string;

  // @Column()
  start_date: Date;

  // @Column()
  end_date: Date;

  // @Column()
  total: number;

  // @Column()
  expect_return_date: Date;

  // @Column()
  created_at: Date;

  // @Column()
  updated_at: Date;
  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
};



export { Rental };
  
