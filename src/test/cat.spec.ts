import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { CatModel, ICat } from '../db/cat.db';
import { UserModel } from '../db/user.db';

chai.use(chaiHttp);

let mockUser = {
    username: 'test',
    password: '123',
    name: {
        firstName: 'john',
        lastName: 'doe'
    },
    email: 'test@example.com'
}

let mockCat = {
    name: "Bolinha",
    color: "Gray and Black",
    age: 2,
    createdBy: undefined
}

@suite("Cats")
class CatsTest {
    public static catId: string;
    public static token: string;

    public static async before() {
        try {
            await CatModel.deleteMany({});
            await UserModel.deleteMany({});

            let user = new UserModel(mockUser);
            await chai.request(server.instance)
                .post('/register')
                .set('Content-Type', 'application/json')
                .send(mockUser)
                .then(res => {})
                .catch(err => {throw err;});

            await chai.request(server.instance)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({username: mockUser.username, password: mockUser.password})
                .then(res => {
                    if (res.status == 200 && res.body.data) this.token = res.body.data;
                })
                .catch(err => { throw err; });
        } catch (err) { throw err; }
    }

    @test("/GET cat - Should get all cats in the db")
    public async getAll() {
        try {
            const res = await chai.request(server.instance)
            .get('/cat')
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body}`);
            assert.lengthOf(res.body.data, 0, 'There are elements in the response.');
        } catch (err) { throw err; }
    }

    @test("/POST - Should create a cat")
    public async create() {
        try {
            const res = await chai.request(server.instance)
            .post('/cat')
            .set('Authorization', `Bearer ${CatsTest.token}`)
            .set('Content-Type', 'application/json')
            .send(mockCat);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.name, mockCat.name, 'The name is wrong');
            assert.equal(res.body.data.color, mockCat.color, 'The color is wrong');
            assert.equal(res.body.data.createdBy, mockUser.username, 'The user is wrong');
            assert.equal(res.body.data.age, mockCat.age, 'The age is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            CatsTest.catId = res.body.data._id;
        } catch (err) { throw err; }
    }

    @test("/GET - Should get the cat created in POST")
    public async getByName() {
        try {
            const res = await chai.request(server.instance)
            .get(`/cat/${mockCat.name}`)
            .set('Content-Type', 'application/json')

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.name, mockCat.name, 'The name is wrong');
            assert.equal(res.body.data.color, mockCat.color, 'The color is wrong');
            assert.equal(res.body.data.createdBy, mockUser.username, 'The user is wrong');
            assert.equal(res.body.data.age, mockCat.age, 'The age is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/PUT - Should update the cat")
    public async update() {
        try {
            const res = await chai.request(server.instance)
            .put(`/cat/${CatsTest.catId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${CatsTest.token}`)
            .send({name: "Bolota"});

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.name, 'Bolota', 'The name is wrong');
            assert.equal(res.body.data.color, mockCat.color, 'The color is wrong');
            assert.equal(res.body.data.createdBy, mockUser.username, 'The user is wrong');
            assert.equal(res.body.data.age, mockCat.age, 'The age is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/DELETE - Should delete the cat")
    public async remove() {
        try {
            const res = await chai.request(server.instance)
            .del(`/cat/${CatsTest.catId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${CatsTest.token}`);

            assert.equal(res.status, 204, 'The http code is wrong');
            assert.typeOf(res.body.data, 'undefined', `${res.body.data}`);
            assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    public static after() {
        server.shutdown();
    }
}
