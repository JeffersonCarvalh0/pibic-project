import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { LocationModel } from '../db/location.db';

chai.use(chaiHttp);

let mockLocation = {
    name: "test",
    description: "whatever",
    coord: [1.5, 1.0] // longitude, latitude
}

@suite("Locations")
class LocationsTest {
    public static locationId: string;

    public static async before() {
        try {
            server.start();
            await LocationModel.deleteMany({});
        }
        catch (err) { throw err; }
    }

    @test("/GET location - Should get all Locations in the db")
    public async getAll() {
        try {
            const res = await chai.request(server.instance)
            .get('/location')
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`);
            assert.lengthOf(res.body.data, 0, 'There are elements in the response');
        } catch (err) { throw err; }
    }

    @test("/POST location - Should create a new Location in the database")
    public async create() {
        try {
            const res = await chai.request(server.instance)
            .post('/location')
            .set('Content-Type', 'application/json')
            .send(mockLocation);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.name, mockLocation.name, 'The name is wrong');
            assert.equal(res.body.data.description, mockLocation.description, 'The description is wrong');
            assert.equal(res.body.data.coord[1], mockLocation.coord[1], 'The latitude is wrong');
            assert.equal(res.body.data.coord[0], mockLocation.coord[0], 'The longitude is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            LocationsTest.locationId = res.body.data._id;
        } catch (err) { throw err; }
    }

    @test("/GET location - Should get a Location by id")
    public async getById() {
        try {
            const res = await chai.request(server.instance)
            .get(`/location/${LocationsTest.locationId}`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.name, mockLocation.name, 'The name is wrong');
            assert.equal(res.body.data.description, mockLocation.description, 'The description is wrong');
            assert.equal(res.body.data.coord[1], mockLocation.coord[1], 'The latitude is wrong');
            assert.equal(res.body.data.coord[0], mockLocation.coord[0], 'The longitude is wrong');
            assert.equal(res.body.data._id, LocationsTest.locationId, 'The id is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/PUT location - should update a Location")
    public async update() {
        try {
            const res = await chai.request(server.instance)
            .put(`/location/${LocationsTest.locationId}`)
            .set('Content-Type', 'application/json')
            .send({ description: "new description" });

            assert.equal(res.status, 200, 'The http code is wrong')
            assert.equal(res.body.data.name, mockLocation.name, 'The name is wrong');
            assert.equal(res.body.data.description, "new description", 'The description is wrong');
            assert.equal(res.body.data.coord[1], mockLocation.coord[1], 'The latitude is wrong');
            assert.equal(res.body.data.coord[0], mockLocation.coord[0], 'The longitude is wrong');
            assert.equal(res.body.data._id, LocationsTest.locationId);
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/DELETE location - Should delete the specified Location")
    public async remove() {
        try {
            const res = await chai.request(server.instance)
            .del(`/location/${LocationsTest.locationId}`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 204, 'The http code is wrong');
            assert.typeOf(res.body.data, 'undefined', `${res.body.data}`);
            assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    public static after() {
        server.shutdown();
    }
}
