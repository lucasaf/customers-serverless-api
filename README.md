# Customers Serverless API

This project is a customer management API service built with NestJS and the Serverless framework, designed to run on AWS Lambda. It allows for managing customer records through a RESTful API interface.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js (18.x+)
- AWS CLI configured with appropriate credentials
- Serverless Framework

### Installing the Serverless Framework

To install the Serverless Framework globally:

```bash
npm install -g serverless
```

## Setting Up the Project

1. Clone the repository:

```bash
$ git clone https://github.com/lucasaf/customers-serverless-api.git
```

2. Navigate to the project directory:

```bash
$ cd customers-serverless-api
```

3. Install the dependencies

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## Deployment

```bash
# To deploy on AWS Lambda:
$ serverless deploy
```

## Authors

Lucas Alves Ferreira - Initial work - (https://www.sgithub.com/lucasaf)

## Built With

- Serverless - [https://www.serverless.com/](https://www.serverless.com/)
- NestJS - [https://nestjs.com](https://nestjs.com/)
- AWS DynamoDB - [https://aws.amazon.com/pt/dynamodb/](https://aws.amazon.com/pt/dynamodb/)

## Improvements

- Validate the inputs and outputs

  - Create the DTOs;
  - validate Model and Customer Domain;
  - Add global pipes and filters
  - Refactor error handler and review exception messages and HTTP status code;

- Endpoint that performs a free text search across all customer fields;

  - Stream DynamoDB to Elasticsearch

- API endpoint security

  - add safeguard data access and transactions

- Logging, monitoring, and auditing

- Serverless APIs
  - create a function for all methods individually;
  - integrate with Elasticsearch;

Nest is [MIT licensed](LICENSE).

## License

Nest is [MIT licensed](LICENSE).
