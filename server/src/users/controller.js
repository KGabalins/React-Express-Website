const documentClient = require("../../dynamodb");
const parameters = require("./params");
const params = parameters.params

const getUserData = (req, res) => {
  const userEmail = req.params.email;
  params.get.ExpressionAttributeValues[":email"] = userEmail
  documentClient.scan(params.get, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  })
};

const addUser = (req, res) => {
  const {name, surname, email, password, role} = req.body

  params.post.Item["name"] = name
  params.post.Item["surname"] = surname
  params.post.Item["password"] = password
  params.post.Item["email"] = email
  params.post.Item["role"] = role
  documentClient.put(params.post, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  })
}

module.exports = {
  getUserData,
  addUser
};


