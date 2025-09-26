const users = require('../model/userModel');
const bcrypt = require('bcryptjs');

function registerUser(username, password) {
  if (users.find(u => u.username === username)) {
    return { error: 'Usuário já existe' };
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword, balance: 1000, favorecidos: [] });
  return { message: 'Usuário registrado com sucesso' };
}

/*function authenticateUser(username, password) {
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { error: 'Credenciais inválidas' };
  }
  return user;
}*/

function getUsers() {
  return users.map(u => ({ username: u.username, balance: u.balance, favorecidos: u.favorecidos }));
}

function addFavorecido(username, favorecido) {
  const user = users.find(u => u.username === username);
  if (!user) return { error: 'Usuário não encontrado' };
  if (!user.favorecidos.includes(favorecido)) {
    user.favorecidos.push(favorecido);
  }
  return { message: 'Favorecido adicionado' };
}

module.exports = { registerUser, getUsers, addFavorecido };
