import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { ContentModel, IContent } from '../db/content.db';
import { LocationModel } from '../db/location.db';

chai.use(chaiHttp);

let mockContent = {
    title: "test",
    description: "An awesome test!"
}

let mockLocation = {
    name: "test",
    latitude: 1.0,
    longitude: 1.5
}

@suite("Contents")
class ContentsTest {
    public static contentId: string;
    public static locationId: string;

    public static async before() {
        try {
            server.start();
            await ContentModel.deleteMany({});
            await LocationModel.deleteMany({});
            let res = await chai.request(server.instance)
            .post('/location')
            .set('Content-Type', 'application/json')
            .send(mockLocation);
            ContentsTest.locationId = res.body._id;
        } catch (err) { throw err; }
    }

    @test("/GET content - Should get all contents from the db")
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

    @test("/POST content - Should create a new content in the database")
    public async postContent() {
        try {
            let res = await chai.request(server.instance)
            .post(`/content`)
            .set('Content-Type', 'application/json')
            .send(mockContent);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.title, mockContent.title, 'The title is wrong');
            assert.equal(res.body.data.description, mockContent.description, 'The description is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            ContentsTest.contentId = res.body.data._id;
        } catch(err) { throw err; }
    }

    @test("/GET content - Should get a content by id")
    public async getById() {
        try {
            let res = await chai.request(server.instance)
            .get(`/content/${ContentsTest.contentId}`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.title, mockContent.title, 'The title is wrong');
            assert.equal(res.body.data.description, mockContent.description, 'The description is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch(err) { throw err; }
    }

    @test("/PUT content - Should update a content in the database")
    public async update() {
        try {
            let res = await chai.request(server.instance)
            .put(`/content/${ContentsTest.contentId}`)
            .set('Content-Type', 'application/json')
            .send({ description: 'An even better test!!!' });

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.title, mockContent.title, 'The title is wrong');
            assert.equal(res.body.data.description, 'An even better test!!!', 'The description is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch(err) { throw err; }
    }

    @test("/DELETE content - Should delete a content from the database")
    public async delete() {
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
