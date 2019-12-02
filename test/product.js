//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../models/product.model');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Products', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        Product.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Тест для /GET 
  */
  describe('/GET test', () => {
      it('it should GET test controller', (done) => {
        chai.request(server)
            .get('/products/test')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });

});

describe('/POST product', () => {
      it('it should POST product', (done) => {
        let product = {
            name: "asus",
            price: 5
        }
        chai.request(server)
            .post('/products/create')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });

  });

describe('/GET/:id product', () => {
      it('it should GET a product by the given id', (done) => {
        let product = new Product({ name: "acer", price: 15 });
        product.save((err, product) => {
            chai.request(server)
            .get('/products/' + product.id)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name');
                res.body.should.have.property('price');
                res.body.should.have.property('_id').eql(product.id);
              done();
            });
        });

      });
  });

describe('/DELETE/:id product', () => {
      it('it should DELETE a product by the given id', (done) => {
        let product = new Product({ name: "apple", price: 2 });
        product.save((err, product) => {
            chai.request(server)
                .delete('/products/' + product.id + '/delete')
                .end((err, res) => {
                    res.should.have.status(200);
                  done();
                });
          });
      });
  });