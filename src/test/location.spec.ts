import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { server } from '../server';
import { LocationModel, ILocation } from '../db/location.db';

chai.use(chaiHttp);

let mockLocation = {
    name: "test",
    latitude: 1.0,
    longitude: 1.5
}

@suite("Locations")
class LocationsTest {
    public static locationId: string;

    public static async before() {
        try { server.start(); await LocationModel.deleteMany({}); }
        catch (err) { throw err; }
    }

    @test("/GET location - Should get all locations in the db")
    public async getAll() {
        try {
            const res = await chai.request(server.instance)
            .get('/location')
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`);
            assert.lengthOf(res.body.data, 0, 'There are elements in the response.');
        } catch (err) { throw err; }
    }

    @test("/POST location - Should create a new location in the database")
    public async create() {
        try {
            const res = await chai.request(server.instance)
            .post('/location')
            .set('Content-Type', 'application/json')
            .send(mockLocation);

            assert.equal(res.status, 201, 'The http code is wrong');
            assert.equal(res.body.data.latitude, mockLocation.latitude, 'The latitude is wrong');
            assert.equal(res.body.data.longitude, mockLocation.longitude, 'The longitude is wrong');
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
            LocationsTest.locationId = res.body.data._id;
        } catch (err) { throw err; }
    }

    @test("/GET location - Should get a location by id")
    public async getById() {
        try {
            const res = await chai.request(server.instance)
            .get(`/location/${LocationsTest.locationId}`)
            .set('Content-Type', 'application/json');

            assert.equal(res.status, 200, 'The http code is wrong');
            assert.equal(res.body.data.latitude, mockLocation.latitude, 'The latitude is wrong');
            assert.equal(res.body.data.longitude, mockLocation.longitude, 'The longitude is wrong');
            assert.equal(res.body.data._id, LocationsTest.locationId);
            assert.typeOf(res.body.errors, 'null', `${res.body.errors}`);
        } catch (err) { throw err; }
    }

    @test("/DELETE location - Should delete the specified location")
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
