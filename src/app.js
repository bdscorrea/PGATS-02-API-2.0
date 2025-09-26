const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
//const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    req.user = { username: 'testuser', balance: 10000, favorecidos: [] };
    next();
  });
}

//const SECRET = 'supersecret';

/*function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}*/

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/register', userController.register);
app.post('/login', userController.login);
//app.get('/users', authenticateToken, userController.getUsers);
app.get('/users', userController.getUsers);
//app.post('/favorecido', authenticateToken, userController.addFavorecido);
app.post('/favorecido', userController.addFavorecido);
//app.post('/transfer', authenticateToken, transferController.transfer);
//app.get('/transfers', authenticateToken, transferController.getTransfers);
app.post('/transfer', transferController.transfer);
app.get('/transfers', transferController.getTransfers);

module.exports = app;
