import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, DatabaseService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('create', () => {
    // it('should create a new customer', async () => {
    //   const createCustomerDto = {
    //     nome: 'Customer',
    //     email: 'Customer@example.com',
    //   };
    //   const expectedCustomer = { id: uuid(), ...createCustomerDto };
    //   jest.spyOn(databaseService, 'dynamoDBClient').mockReturnValue({
    //     put: jest.fn().mockResolvedValue(expectedCustomer),
    //   });
    //   const result = await service.create(createCustomerDto);
    //   expect(result).toEqual(expectedCustomer);
    //   expect(databaseService.put).toHaveBeenCalledWith(/* Parâmetros esperados para databaseService.put */);
    // });
  });
});
