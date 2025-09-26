//bibliotecas
const request = require('supertest');
const { expect } = require('chai');


//testes
describe('Transfer Controller External', () => {
    describe('POST /transfer', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 400 e a mensagem de erro', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .send({
                      to: "priscila",
                      amount: 200
                    });
        
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Remetente, destinatário e valor são obrigatórios')
    });
});
});
