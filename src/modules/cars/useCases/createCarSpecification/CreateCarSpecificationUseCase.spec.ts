import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";



let createCarSpecificationUseCase:CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory, specificationsRepositoryInMemory);
  })
  it('should not be able add a new car specification to a non existent car', async () => {
    expect(async ()=>{
      const car_id = "1234";
      const specifications_id = ["54321"];
      await createCarSpecificationUseCase.execute({
        car_id, 
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError)
      
    
  });
  it('should be able add a new car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'TestCar', 
      description: 'TestDescriptions',  
      daily_rate: 100, 
      license_plate: 'TestPlate',
      fine_amount: 10,
      brand: 'TestBrand', 
      category_id: 'TestCategory'
    })
    const specification = await specificationsRepositoryInMemory.create({name: "turbo", description: "motor turbo"})
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id, 
      specifications_id
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  })
})