// Users.js
const users = []

const addUser = (user) => {
  users.push(user)
}

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email)
}

export { users, addUser, findUserByEmail }

