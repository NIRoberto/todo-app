import chai from 'chai';
import chaiHttp from 'chai-Http';
import app from '../app.js';
let should = chai.should();

let validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImprQGdtYWlsLmNvbSIsImlhdCI6MTYwOTE4NDE3OH0.YvevJ88HV609T36yK89UpTpjXz99SGZMeVQFrF3TYoU`;
let invalidToken = `yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImprQGdtYWlsLmNvbSIsImlhdCI6MTYwOTE4NDE3OH0.YvevJ88HV609T36yK89UpTpjXz99SGZMeVQFrF3TYoU`;
let otherToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidG9kbzY1QGdtYWlsLmNvbSIsImlhdCI6MTYwOTI0Njk0N30.aOIK_EX9vqSveMu0YdyMpotD_8GwjaH4mPMKQ4rPwIo`;
let validId = 3;
let invalidId = 100;
chai.use(chaiHttp);

describe('/GET testing endpoint for getting all wrestle names', () => {
    it('It should get all wrestles names', (done) => {
        chai.request(app)
            .get('/api/v1/todo/wrestles/')
            .set("Authorization", validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    it('It should not get all wrestle names because invalid URL', (done) => {
        chai.request(app)
            .get('/api/v1/todo/wrestle/')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
        it('It should not get all wrestle names because of unauthorized', (done) => {
        chai.request(app)
            .get('/api/v1/todo/wrestles/')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
        });
          it('It should not get all wrestle names because of an invalid token ', (done) => {
        chai.request(app)
            .get('/api/v1/todo/wrestles/')
            .set('Authorization',invalidToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
})
describe('/GET testing endpoint for get one   wrestle name', () => {
    it('It should get one wrestle name', (done) => {
        chai.request(app)
            .get(`/api/v1/todo/wrestles/${validId}`)
            .set('Authorization',validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("success");
                res.body.should.have.property('getWrestle');
                res.body.getWrestle.should.have.property('id');
                res.body.getWrestle.should.have.property('name');
                res.body.getWrestle.should.have.property('wrestleCreatorEmail');
                done();
            });
    });
    it('It should not get one wrestle name because of unauthorized  ', (done) => {
        chai.request(app)
            .get('/api/v1/todo/wrestles/')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
        it('It should not get one wrestle name  because invalid token', (done) => {
        chai.request(app)
            .get(`/api/v1/todo/wrestles/${validId}`)
            .set('Authorization',invalidToken)
             .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
        it('It should not get one wrestle name  because invalid id ', (done) => {
        chai.request(app)
            .get(`/api/v1/todo/wrestles/${invalidId}`)
            .set('Authorization',validToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
})
describe('/POST testing endpoint for create one   wrestle name', () => {
    it('It should post one wrestle name', (done) => {
        chai.request(app)
            .post(`/api/v1/todo/wrestles/create`)
            .set('Authorization', validToken)
            .send({
                name:"Undertaker"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("wrestle name created successfully");
              res.body.should.have.property('wrestle');
              res.body.wrestle.should.have.property('id');
              res.body.wrestle.should.have.property('name');
              res.body.wrestle.should.have.property('wrestleCreatorEmail');
                done();
            });
    });
    it('It should not post one wrestle name because of unauthorized  ', (done) => {
        chai.request(app)
            .post('/api/v1/todo/wrestles/create')
            
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
        it('It should not post one wrestle name  because invalid token', (done) => {
        chai.request(app)
            .post(`/api/v1/todo/wrestles/create`)
         
            .set('Authorization',invalidToken)
             .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
        it('It should not post one wrestle name  because name is required ', (done) => {
        chai.request(app)
            .post(`/api/v1/todo/wrestles/create`)
            .set('Authorization',validToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
})
describe('/UPDATE testing endpoint for update one   wrestle name', () => {
    it('It should update one wrestle name', (done) => {
        chai.request(app)
            .put(`/api/v1/todo/wrestles/update/${validId}`)
            .set('Authorization', validToken)
            .send({
                name:"Jey Uso"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("update name was successfully done");
                res.body.should.have.property('updateName');
                res.body.updateName.should.have.property('id');
                res.body.updateName.should.have.property('name');
                res.body.updateName.should.have.property('wrestleCreatorEmail');
                done();
            });
    });
    it('It should not update one wrestle name because of unauthorized  ', (done) => {
        chai.request(app)
            .put(`/api/v1/todo/wrestles/update/${validId}`)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
        it('It should not update one wrestle name  because invalid token', (done) => {
        chai.request(app)
            .put(`/api/v1/todo/wrestles/update/${validId}`)
            .set('Authorization',invalidToken)
             .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
        it('It should not update one wrestle name  because invalid id ', (done) => {
        chai.request(app)
            .put(`/api/v1/todo/wrestles/update/${invalidId}`)
            .set('Authorization',validToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
})
describe('/DELETE testing endpoint for delete one   wrestle name', () => {

    it('It should not delete one wrestle name because of unauthorized  ', (done) => {
        chai.request(app)
            .delete(`/api/v1/todo/wrestles/delete/${validId}`)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
        it('It should not delete one wrestle name  because invalid token', (done) => {
        chai.request(app)
            .delete(`/api/v1/todo/wrestles/delete/${validId}`)
            .set('Authorization',invalidToken)
             .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
        it('It should not delete one wrestle name  because invalid id ', (done) => {
        chai.request(app)
            .delete(`/api/v1/todo/wrestles/delete/${invalidId}`)
            .set('Authorization',validToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
        });
         it('It should not delete one wrestle name  because invalid id ', (done) => {
        chai.request(app)
            .delete(`/api/v1/todo/wrestles/delete/${invalidId}`)
            .set('Authorization',validToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
         });
           it('It should not delete one wrestle name  because because the name is not yours', (done) => {
        chai.request(app)
            .delete(`/api/v1/todo/wrestles/delete/${invalidId}`)
            .set('Authorization',otherToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
})