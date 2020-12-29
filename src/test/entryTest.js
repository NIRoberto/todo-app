import chai from 'chai';
import chaiHttp from 'chai-Http';
import app from '../app.js';
let should = chai.should();


describe('/get testing welcome route', () => {
 
          it('It should test welcome message to My API', (done) => {
        chai.request(app)
          .get('/')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("message").eql("Welcome to todo app backend")                
              done();
            });
          });
           it('It should check for invalid URL', (done) => {
        chai.request(app)
          .get('/api/v1/to')
          .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property("Error").eql("invalid url")                
              
              done();
            });
           });
      });