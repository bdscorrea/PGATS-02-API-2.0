const transferService = require('../../src/service/transferService');
/*
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
}*/
// 
function getTransfers(req, res) {
  const username = req.user.username;
  res.json(transferService.getTransfers(username));
  } 
  
function transfer(req, res) {
  try {
    const { to, amount } = req.body;
    const fromUsername = req.user?.username; // safe access
    if (!fromUsername) {
      return res.status(400).json({ error: "Usuário remetente não autenticado" });
    }
    const result = transferService.transfer(fromUsername, to, amount);
    if (result.error) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = { transfer,  getTransfers };
