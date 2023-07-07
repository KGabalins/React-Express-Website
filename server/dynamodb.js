const DynamoDB = require("aws-sdk/clients/dynamodb");
require("dotenv").config();

const documentClient = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
});

module.exports = documentClient