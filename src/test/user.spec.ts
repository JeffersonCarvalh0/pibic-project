import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { UserModel } from '../db/user.db';
import { ActivityModel } from '../db/activity.db';
import { LocationModel } from '../db/location.db';
import { ContentModel } from '../db/content.db';

chai.use(chaiHttp);

let mockUser = {
    username: "user",
    password: "1234",
    name: {
        firstName: "John",
        lastName: "Doe"
    },
    email: "johndoe@example.com"
}

let credentials = {
    username: mockUser.username,
    password: mockUser.password
};

let mockLocation = { name: "test", latitude: 1.0, longitude: 1.5 };
let mockLocation2 = { name: "test2", latitude: 0.9, longitude: 0.8 };
let mockLocation3 = { name: "test3", latitude: 0.7, longitude: 0.6 };

let mockContent = { title: "test", description: "An awesome test!" };
let mockActivity = { title: "activity", statement: "just passing by" };

@suite("Users")
class UsersTest {
    public static userId: string;
    public static contentId: string;
    public static locationId: string;
    public static location2Id: string;
    public static location3Id: string;
    public static activityId: string;
    public static token: string;

    public static async before() {
        server.start();
        await UserModel.deleteMany({});
        await ContentModel.deleteMany({});
        await LocationModel.deleteMany({});
        await ActivityModel.deleteMany({});

        let res = await chai.request(server.instance)
        .post(`/content`)
        .set('Content-Type', 'application/json')
        .send(mockContent);
        UsersTest.contentId = res.body.data._id;

        res = await chai.request(server.instance)
        .post(`/location`)
        .set('Content-Type', 'application/json')
        .send(mockLocation);
        UsersTest.locationId = res.body.data._id;

        res = await chai.request(server.instance)
        .post(`/location`)
        .set('Content-Type', 'application/json')
        .send(mockLocation2);
        UsersTest.location2Id = res.body.data._id;

        res = await chai.request(server.instance)
        .post(`/location`)
        .set('Content-Type', 'application/json')
        .send(mockLocation3);
        UsersTest.location3Id = res.body.data._id;

        await chai.request(server.instance)
        .put(`/location/${UsersTest.locationId}/${UsersTest.contentId}`)
        .set('Content-Type', 'application/json');

        res = await chai.request(server.instance)
        .post(`/activity`)
        .set('Content-Type', 'application/json')
        .send(mockActivity);
        UsersTest.activityId = res.body.data._id;

        await chai.request(server.instance)
        .put(`/activity/${UsersTest.activityId}`)
        .set('Content-Type', 'application/json')
        .send({
            "locations": [UsersTest.locationId, UsersTest.location2Id, UsersTest.location3Id]
        });
    }

    @test("/POST user - Should create a new user")
    public async create() {
        try {
            const res = await chai.request(server.instance)
            .post(`/user`)
            .set('Content-Type', 'application/json')
            .send(mockUser);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.username, mockUser.username, 'The username is wrong');
            assert.equal(res.body.data.name.firstName, mockUser.name.firstName, 'The first name is wrong');
            assert.equal(res.body.data.name.lastName, mockUser.name.lastName, 'The last name is wrong');
            assert.equal(res.body.data.email, mockUser.email, 'The e-mail is wrong');
        } catch (err) { throw err; }
    }

    @test("/POST user - Should log in")
    public async login() {
        try {
            const res = await chai.request(server.instance)
            .post(`/login`)
            .set('Content-Type', 'application/json')
            .send(credentials);

            assert.equal(res.status, 200, 'The http code is wrong');
            UsersTest.token = res.body.data;
        } catch (err) { throw err; }
    }

    @test("/POST user - Should test authentication")
    public async testAuth() {
        try {
            const res = await chai.request(server.instance)
            .get(`/testAuth`)
            .set('Authorization', `Bearer ${UsersTest.token}`)
            .set('Content-Type', 'applicaiton/json');

            assert.equal(res.status, 200, 'The http code is wrong');
        } catch (err) { throw err; }
    }

    @test("/DELTE user - Should delete an logged user")
    public async remove() {
        try {
            const res = await chai.request(server.instance)
            .del(`/user`)
            .set('Authorization', `Bearer ${UsersTest.token}`)
            .set('Content-Type', 'application/json')

            assert.equal(res.status, 201, 'The http code is wrong')
            assert.equal(await UserModel.findById(UsersTest.userId), undefined, 'The user is not undefined');
        } catch (err) { throw err; }
    }

    public static after() { server.shutdown(); }
}
