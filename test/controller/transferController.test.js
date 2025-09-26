//bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../src/app');
//MOCK - importar o transfer service
const transferService = require('../../src/service/transferService');

//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 400 e a mensagem de erro', async () => {
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    to: "priscila",
                    amount: 200
                    });
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Destinatário não encontrado.')
        });

        it('Usando Mocks: Quando recebo remetente e destinatário inexistentes recebo 400 e a mensagem de erro', async () => {
            //mocar apenas a função transfers do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws({ error: 'Destinatário não encontrado.' });

            const resposta = await request(app)
                .post('/transfers')
                .send({
                      to: "priscila",
                      amount: 200
                    });
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Destinatário não encontrado.')
        
  sinon.restore();
        });

        it('Usando Mocks: Transferência realizada com sucesso. - 200', async () => {
            //mocar apenas a função transfers do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({ 
                to: "bea",
                amount: 222
            });

            const resposta = await request(app)
                .post('/transfers')
                .send({
                    to: "bea",
                    amount: 222
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('message', 'Transferência realizada com sucesso.');

            sinon.restore();
            console.log(resposta.body)
        });
});
});


describe('GET /transfers', () => {
    //its ficam aqui
});