// module.exports = {
//   getUser : {
//     TableName: "users",
//     FilterExpression: "email = :email",
//     ExpressionAttributeValues: { ":email": "none" },
//   },
//   postUser: {
//     TableName: "users",
//     Item: {
//       name: "",
//       surname: "",
//       password: "",
//       email: "",
//       role: "",
//     },
//   },
//   updateUser: {
//     TableName: "users",
//     Key: { email: "" },
//     UpdateExpression: "SET #dataType = :dataValue",
//     ExpressionAttributeNames: { "#dataType": "" },
//     ExpressionAttributeValues: { ":dataValue": "" },
//   },
//   removeUser: {
//     TableName: "users",
//     Key: { email: "" },
//   },
//   postPerm: {
//     TableName: "permissions",
//     Item: {
//       email: "",
//       role: "",
//     }
//   }
// };

const dynamoClient = require("../database/dynamodb");
const { updateMovieRenter } = require("./rentedMoviesModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get user data
const getUser = async (userEmail) => {
  const params = {
    TableName: "users",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": userEmail },
  };
  const userData = await dynamoClient.scan(params).promise();
  return userData.Items[0];
};

// Get user permission data
const getPerm = async (userEmail) => {
  const params = {
    TableName: "permissions",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": userEmail },
  };
  const userPerm = await dynamoClient.scan(params).promise();
  return userPerm.Items[0];
};

// Login user
const loginUser = async ({ email, password }) => {
  const user = await getUser(email);

  if (!user) {
    return { auth: false, message: "User doesn't exist!" };
  } else if (user.password !== password) {
    return { auth: false, message: "Wrong password!" };
  }

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 300,
  });

  return { auth: true, token, result: user };
};

// Add user to DB (also adds user permission *default is user)
const addUser = async ({ name, surname, password, email }) => {
  const userExists = await getUser(email);

  if (userExists) {
    return false;
  }

  if (name.length < 2 || !validateEmail(email) || password.length < 8) {
    return undefined;
  }

  const params = {
    TableName: "users",
    Item: {
      name,
      surname,
      password,
      email,
    },
  };
  await addPerm(email, "user");
  return await dynamoClient.put(params).promise();
};

// Add or update user permissions
const addPerm = async (email, role) => {
  const userPerm = getPerm(email);

  const params = {
    TableName: "permissions",
    Item: {
      email,
      role,
    },
  };
  return await dynamoClient.put(params).promise();
};

// Delete user from DB (also deletes user permissions)
const deleteUser = async (email) => {
  const userData = await getUser(email);

  if (!userData) {
    return undefined;
  }

  const params = {
    TableName: "users",
    Key: { email },
  };

  await deletePerm(email);
  return await dynamoClient.delete(params).promise();
};

// Deletes user permissions
const deletePerm = async (email) => {
  const userPerm = await getPerm(email);

  if (!userPerm) {
    return false;
  }

  const params = {
    TableName: "permissions",
    Key: { email },
  };

  return await dynamoClient.delete(params).promise();
};

// Updates user email (also updates user permissions email)
const updateEmail = async (email, newEmail) => {
  const userData = await getUser(email);
  const userPerm = await getPerm(email);

  if (!userData) {
    return false;
  }

  userData.email = newEmail;
  userPerm.email = newEmail;

  await updateMovieRenter(email, newEmail);
  await deleteUser(email);
  return await addUser(userData);
};

// Updates user password
const updatePassword = async (email, password) => {
  const userExists = await getUser(email);

  if (!userExists) {
    return false;
  } else if (password.length < 8) {
    return undefined;
  }

  const params = {
    TableName: "users",
    Key: { email },
    UpdateExpression: "SET #dataType = :dataValue",
    ExpressionAttributeNames: { "#dataType": "password" },
    ExpressionAttributeValues: { ":dataValue": password },
  };

  return await dynamoClient.update(params).promise();
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
  getUser,
  getPerm,
  loginUser,
  addUser,
  deleteUser,
  updateEmail,
  updatePassword,
};
