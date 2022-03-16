import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('List cars', () => {
  beforeEach(() =>  {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })
  it('Should be able to lis all avaible cars', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "CyberTruc", 
      "description": "qwersfvbstdfhujerj", 
      "daily_rate": 10000, 
      "license_plate": "C7B3RT5CK", 
      "fine_amount": 1000,
      "brand": "Tesla", 
      "category_id": "6c6c90a0-b4e6-4a60-89c2-df0baf6a1a49"
    })
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('Shoul be able to list all avaible cars by name', async ()=>{
    const car = await carsRepositoryInMemory.create({
      "name": "CyberTruck", 
      "description": "qwersfvbstdfhujerj", 
      "daily_rate": 10000, 
      "license_plate": "C7B3RT5CK", 
      "fine_amount": 1000,
      "brand": "Tesla", 
      "category_id": "6c6c90a0-b4e6-4a60-89c2-df0baf6a1a49"
    })
    const cars = await listAvailableCarsUseCase.execute({
      name: "CyberTruck"
    });
    expect(cars).toEqual([car]);
  })
  it('Shoul be able to list all avaible cars by brand', async ()=>{
    const car = await carsRepositoryInMemory.create({
      "name": "TucTuc", 
      "description": "qwersfvbstdfhujerj", 
      "daily_rate": 10000, 
      "license_plate": "C7B3RT5CK", 
      "fine_amount": 1000,
      "brand": "TocToc", 
      "category_id": "6c6c90a0-b4e6-4a60-89c2-df0baf6a1a49"
    })
    const cars = await listAvailableCarsUseCase.execute({
      brand: "TocToc"
    });
    expect(cars).toEqual([car]);
  })
  it('Shoul be able to list all avaible cars by category_id', async ()=>{
    const car = await carsRepositoryInMemory.create({
      "name": "TucTuc", 
      "description": "qwersfvbstdfhujerj", 
      "daily_rate": 10000, 
      "license_plate": "C7B3RT5CK", 
      "fine_amount": 1000,
      "brand": "TocToc", 
      "category_id": "6c6c90a0-b4e6-4a60-89c2"
    })
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "6c6c90a0-b4e6-4a60-89c2"
    });
    expect(cars).toEqual([car]);
  })
})

