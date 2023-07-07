const params = {
  get: {
    TableName: "users",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": "none" },
  },
  post: {
    TableName: "users",
    Item: {
      name: "",
      surname: "",
      password: "",
      email: "",
      role: "",
    },
  },
  put: {
    TableName: "users",
    Key: { email: ""},
    UpdateExpression: "SET #dataType = :dataValue",
    ExpressionAttributeNames: { "#dataType": "" },
    ExpressionAttributeValues: { ":dataValue": "" },
  },
  delete: {
    TableName: "users",
    Key: { email: ""}
  }
};
module.exports = {
  params,
};
