import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImprQGdtYWlsLmNvbSIsImlhdCI6MTYwOTE4NDE3OH0.YvevJ88HV609T36yK89UpTpjXz99SGZMeVQFrF3TYoU';

const validId = 2;
chai.use(chaiHttp);

describe('/POST testing endpoint for user signup', () => {
  it('It should not be able to signup because invalid email address', (done) => {
    chai.request(app)
      .post('/api/v1/todo/user/signup/')
      .send({
        email: 'robzgmail.com',
        password: '123456',

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('It should not be able to signup because invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/todo/user/signup/')
      .send({
        email: 'robzgmail.com',
        password: '123456',

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('It should not be able to signup because email already been taken', (done) => {
    chai.request(app)
      .post('/api/v1/todo/user/signup/')
      .send({
        email: 'robz@gmail.com',
        password: '123456',

      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('Error');

        done();
      });
  });
});
describe('/POST testing endpoint for user login', () => {
  it('It should be able to login', (done) => {
    chai.request(app)
      .post('/api/v1/todo/user/login')
      .send({

        email: 'todo65@gmail.com',
        password: '65432',

      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.should.have.property('message');
        res.body.user.should.have.property('id');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('password');

        done();
      });
  });
  it('It should not be able to login because invalid email address', (done) => {
    chai.request(app)
      .post('/api/v1/todo/user/login/')
      .send({
        email: 'robzgmail.com',
        password: '123456',

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('Error').eql('Incorrect email or password');

        done();
      });
  });
  it('It should not be able to login because invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/todo/user/login/')
      .send({
        email: 'robzgmail.com',
        password: '123456',

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('Error').eql('Incorrect email or password');

        done();
      });
  });
});

describe('/POST testing endpoint for delete users', () => {
  it('It should not be able to delete because user doesn\'t exist ', (done) => {
    chai.request(app)
      .delete(`/api/v1/todo/user/delete/${9897}`)
      .set('Authorization', validToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('User not found');

        done();
      });
  });

  it('It should not be able to delete because of unauthorized ', (done) => {
    chai.request(app)
      .delete(`/api/v1/todo/user/delete/${validId}`)

      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('User not found');

        done();
      });
  });
});
