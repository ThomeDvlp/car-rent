import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {  
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })
  it('should create a new car', async () => {
    await createCarUseCase.execute({
    name: 'TestCar', 
    description: 'TestDescriptions',  
    daily_rate: 100, 
    license_plate: 'TestPlate',
    fine_amount: 10,
    brand: 'TestBrand', 
    category_id: 'TestCategory'
    });
  });
  it('Shoud not be able to create a new car with license_plate of other registered car', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'TestCar', 
        description: 'TestDescriptions',  
        daily_rate: 100, 
        license_plate: 'TestPlate',
        fine_amount: 10,
        brand: 'TestBrand', 
        category_id: 'TestCategory'
        });

      await createCarUseCase.execute({
          name: 'TestCar2', 
          description: 'TestDescriptions',  
          daily_rate: 100, 
          license_plate: 'TestPlate',
          fine_amount: 10,
          brand: 'TestBrand', 
          category_id: 'TestCategory'
          });
    }).rejects.toBeInstanceOf(AppError);
  })
  it('Shoud be able to create a new car default available', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Avaible', 
      description: 'TestDescriptions',  
      daily_rate: 100, 
      license_plate: 'TestPlate',
      fine_amount: 10,
      brand: 'TestBrand', 
      category_id: 'TestCategory'
      });

    expect(car.available).toBe(true);
  })
})