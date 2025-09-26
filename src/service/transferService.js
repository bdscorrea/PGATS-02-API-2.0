const users = require('../model/userModel');
const transfers = require('../model/transferModel');

function transfer(fromUsername, toUsername, amount) {
  const fromUser = users.find(u => u.username === fromUsername);
  const toUser = users.find(u => u.username === toUsername);
  if (!toUser) return { error: 'Destinatário não encontrado' };
  if (fromUser.balance < amount) return { error: 'Saldo insuficiente' };
  // Regra do favorecido
  if (!fromUser.favorecidos.includes(toUsername) && amount >= 5000) {
    return { error: 'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos' };
  }
  fromUser.balance -= amount;
  toUser.balance += amount;
  transfers.push({ from: fromUsername, to: toUsername, amount, date: new Date() });
  return { message: 'Transferência realizada com sucesso' };
}

function getTransfers(username) {
  return transfers.filter(t => t.from === username || t.to === username);
}

module.exports = { transfer, getTransfers };
