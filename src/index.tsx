import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

//criar rotas
createServer({
  // BD do mirage
  models:{
    transaction: Model,
  },

  //dados pré cadastrados
  seeds(server){
    server.db.loadData({
      //sempre o nome do model no plural
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-08-13 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-09-12 11:00:00'),
        },
      ]
    })
  },


  routes(){
    this.namespace = 'api';

    //devolve
    this.get('/transactions',() =>{
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema,request) => {
      //converte para json
      const data = JSON.parse(request.requestBody)

      //primeiro qual tou inserindo e depois os dados que quero passar
      return schema.create('transaction', data)
    })

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

