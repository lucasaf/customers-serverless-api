import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  private readonly TABLE_NAME: string = this.configService.get<string>('TABLE_NAME');
  private USERS_TABLE = process.env.USERS_TABLE;
  dynamoDbClient;

  constructor(private configService: ConfigService, private dbService: DatabaseService) {
    this.dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
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
      return await this.dynamoDbClient.send(new PutCommand(params));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<any> {
    const params = {
      TableName: 'CustomersTable',
    };

    try {
      const { Items } = await this.dynamoDbClient.send(new ScanCommand(params));

      return Items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    const params = {
      TableName: 'CustomersTable',
      Key: {
        id: id,
      },
    };

    try {
      const { Item } = await this.dynamoDbClient.send(new GetCommand(params));

      if (Item) {
        return Item;
      } else {
        throw new NotFoundException({ error: `Could not find customer with provided #${id}` });
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCustomerDto) {
    const params = {
      TableName: 'CustomersTable',
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

    try {
      const { Attributes } = await this.dynamoDbClient.send(new UpdateCommand(params));
      return Attributes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeOne(id: string) {
    const params = {
      TableName: 'CustomersTable',
      Key: { id },
    };

    try {
      await this.dynamoDbClient.send(new DeleteCommand(params));
      return { id };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  search(query: string) {
    throw new Error('Method not implemented.');
  }
}
