import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, DatabaseService],
})
export class CustomersModule {}
