import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private readonly TABLE_NAME: string = this.configService.get<string>('TABLE_NAME');
  private USERS_TABLE = process.env.USERS_TABLE;
  dynamoDBClient;

  constructor(private configService: ConfigService, private dbService: DatabaseService) {
    this.dynamoDBClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = {
      id: uuid(),
      ...createCustomerDto,
    };

    const params = {
      TableName: 'CustomersTable',
      Item: customer,
    };

    try {
      return await this.dynamoDBClient.send(new PutCommand(params));
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
