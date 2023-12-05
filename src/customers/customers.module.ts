import { Module } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from './constants';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerRepository } from './gateways/customer.repository';
@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
  ],
})
export class CustomersModule {}
