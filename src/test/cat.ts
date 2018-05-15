import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { CatModel, ICat } from '../db/cat';

chai.use(chaiHttp);

let mockCat = {
    name: "Bolinha",
    color: "Gray and Black",
    age: 2
}

@suite("Cats")
class CatsTest {
    public static catId: string;

    public static async before() {
        await CatModel.deleteMany({});
    }

    @test("/GET cat - Should get all cats in the db")
    public getAll(done: Function) {
        chai.request(server.instance)
        .get('/cat')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            assert.equal(res.status, 200, 'The http code is wrong');
            assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body}`);
            assert.lengthOf(res.body.data, 0, 'There are elements in the response.');
            done();
        });
    }

    @test("/POST - Should create a cat")
    public create(done: Function) {
        chai.request(server.instance)
        .post('/cat')
        .send(mockCat)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.name, mockCat.name, 'The name is wrong');
            assert.equal(res.body.data.color, mockCat.color, 'The color is wrong');
            assert.equal(res.body.data.age, mockCat.age, 'The age is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            CatsTest.catId = res.body.data._id;
            done();
        });
    }

    @test("/GET - Should get the cat created in POST")
    public getByName(done: Function) {
        chai.request(server.instance)
        .get(`/cat/${mockCat.name}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.name, mockCat.name, 'The name is wrong');
            assert.equal(res.body.data.color, mockCat.color, 'The color is wrong');
            assert.equal(res.body.data.age, mockCat.age, 'The age is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            done();
        });
    }

    @test("/PUT - Should update the cat")
    public update(done: Function) {
        chai.request(server.instance)
        .put(`/cat/${CatsTest.catId}`)
        .set('Content-Type', 'application/json')
        .send({name: "Bolota"})
        .end((err, res) => {
            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.name, 'Bolota', 'The name is wrong');
            assert.equal(res.body.data.color, mockCat.color, 'The color is wrong');
            assert.equal(res.body.data.age, mockCat.age, 'The age is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            done();
        });
    }

    @test("/DELETE - Should delete the cat")
    public remove(done: Function) {
        chai.request(server.instance)
        .del(`cat/${CatsTest.catId}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            assert.equal(res.status, 204, 'The http code is wrong');
            assert.typeOf(res.body.data, 'null', `${res.body.data}`);
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            done();
        });
    }

    public static after() {
        server.shutdown();
    }
}
