const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  const result = userService.registerUser(username, password);
  if (result.error) return res.status(400).json(result);
  res.status(201).json(result);
}

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  const user = userService.authenticateUser(username, password);
  if (user.error) return res.status(401).json(user);
  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
}

function getUsers(req, res) {
  res.json(userService.getUsers());
}

function addFavorecido(req, res) {
  const { favorecido } = req.body;
  const username = req.user.username;
  const result = userService.addFavorecido(username, favorecido);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

module.exports = { register, login, getUsers, addFavorecido };
