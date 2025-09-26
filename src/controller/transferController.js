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
/*
const transferService = require('../../src/service/transferService');

async function transfer(req, res) {
  const { sender, receiver, amount } = req.body;

  // Validação básica de entrada
  if (!sender || !sender.username || !receiver || !receiver.username || !amount) {
    return res.status(400).json({ error: 'Remetente, destinatário e valor são obrigatórios' });
  }

  try {
    // Chama o serviço de transferência
    const result = await transferService.transfer(sender, receiver, amount);

    // Se o serviço retornar null ou algo indicando não encontrado
    if (!result) {
      return res.status(404).json({ error: 'Remetente ou destinatário não encontrado' });
    }

    // Sucesso
    return res.status(200).json(result);

  } catch (err) {
    // Qualquer outro erro inesperado
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }}

  function getTransfers(req, res) {
  const username = req.user.username;
  res.json(transferService.getTransfers(username));
} */

module.exports = { transfer,  getTransfers };
