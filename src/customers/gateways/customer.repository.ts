import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import CustomerModel from '../entities/customer.model';
import { ICustomerRepository } from './customer.repository.interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  private readonly dynamoDbClient: DynamoDBDocumentClient;
  private readonly tableName = this.configService.get('TABLE_NAME');

  constructor(private configService: ConfigService) {
    this.dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  }

  async create(customer): Promise<Customer> {
    const { name, email } = customer;
    const id = uuid();

    const customerModel = new CustomerModel(id, name, email);

    await this.dynamoDbClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: customerModel,
      }),
    );

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const result = await this.dynamoDbClient.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );
    return result.Items as Customer[];
  }

  async findOne(id: string): Promise<Customer> {
    const result = await this.dynamoDbClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
    if (!result.Item) {
      throw new NotFoundException(`Customer with ID "${id}" not found.`);
    }
    return result.Item as Customer;
  }

  async updateOne(id: string, updateCustomerDto: UpdateCustomerDto) {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #name = :n, #email = :e',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':n': updateCustomerDto.name,
        ':e': updateCustomerDto.email,
      },
      ReturnValues: 'UPDATED_NEW' as const,
    };

    const { Attributes } = await this.dynamoDbClient.send(new UpdateCommand(params));

    return Attributes;
  }

  async removeOne(id: string): Promise<void> {
    await this.dynamoDbClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
  }
}
