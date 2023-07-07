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

const updateUserEmail = (req, res) => {
  const newEmail = req.body.email
  const userEmail = req.params.email
  params.get.ExpressionAttributeValues[":email"] = userEmail
  documentClient.scan(params.get, (err, data) => {
    if (err) throw err;
    const userData = data.Items[0]
    userData.email = newEmail
    params.delete.Key["email"] = userEmail
    documentClient.delete(params.delete, (error, results) => {
      if (error) throw error
      const {name, surname, email, password, role} = userData
      params.post.Item["name"] = name
      params.post.Item["surname"] = surname
      params.post.Item["password"] = password
      params.post.Item["email"] = email
      params.post.Item["role"] = role

      documentClient.put(params.post, (error, results) => {
        if (err) throw err;
        res.status(200).json(data);
      })
    })
  })
}

const deleteUser = (req, res) => {
  const userEmail = req.params.email
  params.delete.Key["email"] = userEmail
  documentClient.delete(params.delete, (error, results) => {
    if (error) throw error
    res.status(200).json()
  })
}

module.exports = {
  getUserData,
  addUser,
  updateUserEmail,
  deleteUser
};


