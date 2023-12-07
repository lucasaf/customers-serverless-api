import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_REPOSITORY } from './constants';
import { CustomersService } from './customers.service';
import { ICustomerRepository } from './gateways/customer.repository.interface';

describe('CustomersService', () => {
  let service: CustomersService;
  let mockRepository: Partial<ICustomerRepository>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((customer) => Promise.resolve({ id: 'a-unique-id', ...customer })),
      findAll: jest
        .fn()
        .mockImplementation(() => Promise.resolve([{ id: '123', name: 'Lucas', email: 'lucas@gmail.com' }])),
      findOne: jest.fn().mockImplementation((id) => Promise.resolve({ id, name: 'Lucas', email: 'lucas@gmail.com' })),
      updateOne: jest.fn().mockImplementation((id, customer) => Promise.resolve({ id, ...customer })),
      removeOne: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, { provide: CUSTOMER_REPOSITORY, useValue: mockRepository }],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const customerDto = { name: 'Lucas', email: 'lucas@gmail.com' };
      const expectedCustomer = { id: '123', ...customerDto };

      mockRepository.create = jest.fn().mockResolvedValue(expectedCustomer);

      const result = await service.create(customerDto);
      expect(result).toEqual(expectedCustomer);
      expect(mockRepository.create).toHaveBeenCalledWith(customerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const mockCustomers = [{ id: '123', name: 'Lucas', email: 'lucas@gmail.com' }];

      mockRepository.findAll = jest.fn().mockResolvedValue(mockCustomers);

      const result = await service.findAll();
      expect(result).toEqual(mockCustomers);
    });
  });

  describe('findOne', () => {
    it('should retrieve a single customer', async () => {
      const mockCustomer = { id: '123', name: 'Lucas', email: 'lucas@gmail.com' };

      mockRepository.findOne = jest.fn().mockResolvedValue(mockCustomer);

      const result = await service.findOne('123');
      expect(result).toEqual(mockCustomer);
    });

    it('should throw an error if a customer is not found', async () => {
      mockRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      mockRepository.removeOne = jest.fn().mockResolvedValue(undefined);

      await service.removeOne('123');

      expect(mockRepository.removeOne).toHaveBeenCalledWith('123');
    });
  });
});
