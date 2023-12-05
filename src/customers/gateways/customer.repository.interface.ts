import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: CreateCustomerDto): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  update(id: string, customer: UpdateCustomerDto): Promise<Customer>;
  remove(id: string): Promise<void>;
  search(query);
}
