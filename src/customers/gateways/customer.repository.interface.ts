import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: CreateCustomerDto): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  updateOne(id: string, customer: UpdateCustomerDto);
  removeOne(id: string): Promise<void>;
}
