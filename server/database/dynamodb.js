// const DynamoDB = require("aws-sdk/clients/dynamodb");
const AWS = require("aws-sdk")
require("dotenv").config();

AWS.config.update({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

// const documentClient = new DynamoDB.DocumentClient({
//   region: process.env.DYNAMODB_REGION,
//   endpoint: process.env.DYNAMODB_ENDPOINT,
// });

module.exports = dynamoClient