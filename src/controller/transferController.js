const transferService = require('../../src/service/transferService');

function transfer(req, res) {
  const { to, amount } = req.body;
  const fromUsername = req.user.username;
  const result = transferService.transfer(fromUsername, to, amount);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

function getTransfers(req, res) {
  const username = req.user.username;
  res.json(transferService.getTransfers(username));
}

module.exports = { transfer, getTransfers };
