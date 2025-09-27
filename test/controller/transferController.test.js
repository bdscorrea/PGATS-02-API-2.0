//bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../src/app');
//MOCK - importar o transfer service
const transferService = require('../../src/service/transferService');

// JWT
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';
const payload = { username: 'bea', password: '12345' };
const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
console.log(token);

//testes
describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 400 e a mensagem de erro', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`) // envia o token no header
                .send({
                    to: "priscila",
                    amount: 200
                    });
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Destinatário não encontrado')
        });

        it('Usando Mocks: Quando recebo remetente e destinatário inexistentes recebo 400 e a mensagem de erro', async () => {
            //mocar apenas a função transfers do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({ error: 'Destinatário não encontrado' });

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`) // envia o token no header
                .send({
                      to: "priscila",
                      amount: 200
                    });
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Destinatário não encontrado')
        
  sinon.restore();
  
  //console.log(resposta.body);
        });

      /*  it('Usando Mocks: Transferência realizada com sucesso. - 200', async () => {Remetente, destinatário e valor são obri
            //mocar apenas a função transfers do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({ 
                to: "bea",
                amount: 222
            });

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    to: "bea",
                    amount: 222
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('message', 'Transferência realizada com sucesso.');

            sinon.restore();
            console.log(resposta.body)
        });*/
});
});


describe('GET /transfers', () => {
    //its ficam aqui
});