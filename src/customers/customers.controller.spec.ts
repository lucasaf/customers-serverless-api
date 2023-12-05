import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_REPOSITORY } from './constants';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let mockCustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, { provide: CUSTOMER_REPOSITORY, useValue: mockCustomerRepository }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
