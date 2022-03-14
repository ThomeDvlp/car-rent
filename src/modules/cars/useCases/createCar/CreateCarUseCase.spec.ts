import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
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
  })
})