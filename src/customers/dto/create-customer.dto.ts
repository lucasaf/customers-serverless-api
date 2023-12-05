import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Lucas', description: 'The name of the customer' })
  name: string;

  @ApiProperty({ example: 'lucas@email.com', description: 'The email of the customer' })
  email: string;
}
