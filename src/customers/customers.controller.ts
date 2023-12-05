import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiResponse({ status: 200, description: 'Return all customers.', type: [CreateCustomerDto] })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get('/search')
  search(@Query('query') query: string, @Query('limit') limit = 10, @Query('startKey') startKey?: string) {
    return this.customersService.search(query, limit, startKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.customersService.removeOne(id);
  }
}
