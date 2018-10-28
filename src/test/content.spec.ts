import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { ContentModel } from '../db/content.db';

chai.use(chaiHttp);

let mockContent = {
    description: "An awesome test!",
    correct: "Way to go, dude. You got it right!",
    wrong: "Damn, son. Try that again, would ya?"
}

@suite("Contents")
class ContentsTest {
    public static contentId: string;

    public static async before() {
        try {
            server.start();
            await ContentModel.deleteMany({});
        } catch (err) { throw err; }
    }

    @test("/GET content - Should get all Contents from the db")
    public async getAll() {
        try {
            let res = await chai.request(server.instance)
            .get(`/content`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`);
            assert.lengthOf(res.body.data, 0, 'There are elements in the response');
        } catch(err) { throw err; }
    }

    @test("/POST content - Should create a new Content in the database")
    public async postContent() {
        try {
            let res = await chai.request(server.instance)
            .post(`/content`)
            .set('Content-Type', 'application/json')
            .send(mockContent);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.description, mockContent.description, 'The description is wrong');
            assert.equal(res.body.data.correct, mockContent.correct, 'The correct field is wrong');
            assert.equal(res.body.data.wrong, mockContent.wrong, 'The wrong field is wrong'); // lol
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            ContentsTest.contentId = res.body.data._id;
        } catch(err) { throw err; }
    }

    @test("/GET content - Should get a Content by id")
    public async getById() {
        try {
            let res = await chai.request(server.instance)
            .get(`/content/${ContentsTest.contentId}`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.description, mockContent.description, 'The description is wrong');
            assert.equal(res.body.data.correct, mockContent.correct, 'The correct field is wrong');
            assert.equal(res.body.data.wrong, mockContent.wrong, 'The wrong field is wrong'); // lol
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch(err) { throw err; }
    }

    @test("/PUT content - Should update a Content in the database")
    public async update() {
        try {
            let res = await chai.request(server.instance)
            .put(`/content/${ContentsTest.contentId}`)
            .set('Content-Type', 'application/json')
            .send({ description: 'An even better test!!!' });

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.description, 'An even better test!!!', 'The description is wrong');
            assert.equal(res.body.data.correct, mockContent.correct, 'The correct field is wrong');
            assert.equal(res.body.data.wrong, mockContent.wrong, 'The wrong field is wrong'); // lol
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch(err) { throw err; }
    }

    @test("/DELETE content - Should delete a Content from the database")
    public async remove() {
        try {
            let res = await chai.request(server.instance)
            .del(`/content/${ContentsTest.contentId}`)
            .set('Content-Type', 'applciation/json');

            assert.equal(res.status, 204, 'The http code is wrong');
            assert.typeOf(res.body.data, 'undefined', `${res.body.data}`);
            assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`);
        } catch(err) { throw err; }
    }

    public static after() { server.shutdown(); }
}
