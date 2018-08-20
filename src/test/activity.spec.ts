import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { ActivityModel } from '../db/activity.db';
import { LocationModel } from '../db/location.db';
import { ContentModel } from '../db/content.db';

chai.use(chaiHttp);

let mockLocation = {
    name: "test",
    latitude: 1.0,
    longitude: 1.5
};

let mockContent = {
    title: "test",
    description: "An awesome test!"
};

let mockActivity = {
    title: "activity",
    statement: "just passing by"
};

@suite("Activities")
class ActivitiesTest {
    public static contentId: string;
    public static locationId: string;
    public static activityId: string;

    public static async before() {
        try {
            server.start();
            await ContentModel.deleteMany({});
            await LocationModel.deleteMany({});
            await ActivityModel.deleteMany({});

            let res = await chai.request(server.instance)
            .post(`/content`)
            .set('Content-Type', 'application/json')
            .send(mockContent);
            ActivitiesTest.contentId = res.body.data._id;

            res = await chai.request(server.instance)
            .post(`/location`)
            .set('Content-Type', 'application/json')
            .send(mockLocation);
            ActivitiesTest.locationId = res.body.data._id;

            await chai.request(server.instance)
            .put(`/location/${ActivitiesTest.locationId}/${ActivitiesTest.contentId}`)
            .set('Content-Type', 'application/json');
        } catch (err) { throw err; }
    }

    @test("/GET activity - Get all activities in the database")
    public async getAll() {
        try {
            const res = await chai.request(server.instance)
            .get(`/activity`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`);
            assert.lengthOf(res.body.data, 0, 'There are elements in the response');
        } catch (err) { throw err; }
    }

    @test("/POST activity - Should create a new activity in the database")
    public async create() {
        try {
            const res = await chai.request(server.instance)
            .post(`/activity`)
            .set('Content-Type', 'application/json')
            .send(mockActivity);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.title, mockActivity.title, 'The title is wrong');
            assert.equal(res.body.data.statement, mockActivity.statement, 'The statement is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            ActivitiesTest.activityId = res.body.data._id;
        } catch (err) { throw err; }
    }

    @test("/GET activity - should get an activity by id")
    public async getById() {
        try {
            const res = await chai.request(server.instance)
            .get(`/activity/${ActivitiesTest.activityId}`)
            .set('Content-Type', 'application/json')

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.title, mockActivity.title, 'The title is wrong');
            assert.equal(res.body.data.statement, mockActivity.statement, 'The statement is wrong');
            assert.equal(res.body.data._id, ActivitiesTest.activityId, 'The id is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/PUT activity - should update an activity")
    public async update() {
        try {
            const res = await chai.request(server.instance)
            .put(`/activity/${ActivitiesTest.activityId}`)
            .set('Content-Type', 'application/json')
            .send({ statement: "statement updated" });

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.title, mockActivity.title, 'The title is wrong');
            assert.equal(res.body.data.statement, "statement updated", 'The statement is wrong');
            assert.equal(res.body.data._id, ActivitiesTest.activityId, 'The id is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/DELETE activity - should delete an activity from the database")
    public async remove() {
        try {
            const res = await chai.request(server.instance)
            .del(`/activity/${ActivitiesTest.activityId}`)
            .set('Content-Type', 'application/json');
            console.log("howdy, request sent");

            assert.equal(res.status, 204, 'The http code is wrong');
            assert.typeOf(res.body.data, 'undefined', `${res.body.data}`);
            assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    public static after() { server.shutdown(); }
}