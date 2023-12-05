import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Client } from '@elastic/elasticsearch';
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
  private readonly esClient = new Client({ node: process.env.ELASTICSEARCH_ENDPOINT });

  constructor(private configService: ConfigService) {
    this.dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  }

  async search(query: any) {
    const result = await this.esClient.search({
      index: 'id',
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['name', 'email'],
          },
        },
      },
    });

    return result.hits.hits.map((hit) => hit._source);
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

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const result = await this.dynamoDbClient.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        ReturnValues: 'ALL_NEW',
      }),
    );
    return result.Attributes as Customer;
  }

  async remove(id: string): Promise<void> {
    await this.dynamoDbClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
  }
}
