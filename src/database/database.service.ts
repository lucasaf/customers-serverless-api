import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  connect(): DynamoDBDocumentClient {
    const client = new DynamoDBClient();
    const dynamoDbClient = DynamoDBDocumentClient.from(client);
    console.log(dynamoDbClient);

    return dynamoDbClient;
  }
}
