//bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// JWT
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';
const payload = { username: 'bea', password: '12345' };
const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
console.log(token);

//testes
describe('Transfer Controller External', () => {
    describe('POST /transfer', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 400 e a mensagem de erro', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`) // envia o token no header
                .send({
                      to: "priscila",
                      amount: 200
                    });
        
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Destinatário não encontrado')

        console.log(resposta.body);
    });
      
});
});
