import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from './constants';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { ICustomerRepository } from './gateways/customer.repository.interface';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.create(createCustomerDto);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return this.customerRepository.update(id, updateCustomerDto);
  }

  async removeOne(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    await this.customerRepository.remove(id);
  }

  search(query: string, limit: number, startKey?: string) {
    return this.customerRepository.searchByNameOrEmail(query, limit, startKey);
  }
}
