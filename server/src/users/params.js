const params = {
  get: {
    TableName: "users",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": "none" },
  },
  post: {
    TableName: "users",
    Item: {
      "name": "",
      "surname": "",
      "password": "",
      "email": "",
      "role": "",
    },
  },
};
module.exports = {
  params,
};
