import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'

import { LocationModel } from '../db/location.db'
import { server } from '../server'

chai.use(chaiHttp)

describe('Locations', () => {
  const mockLocation = {
    name: 'test',
    description: 'whatever',
    coord: [1.5, 1.0], // longitude, latitude
  }

  let locationId: string

  before(async () => {
    try {
      await server.start()
      await LocationModel.deleteMany({})
    } catch (err) {
      throw err
    }
  })

  after(async () => server.shutdown())

  it('Should get all Locations from the db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get('/location')
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`)
      assert.lengthOf(res.body.data, 0, 'There are elements in the response')
    } catch (err) {
      throw err
    }
  })

  it('Should create a new Location in the db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .post('/location')
        .set('Content-Type', 'application/json')
        .send(mockLocation)

      assert.equal(res.status, 201, 'The http code is wrong')
      assert.equal(res.body.data.name, mockLocation.name, 'The name is wrong')
      assert.equal(res.body.data.description, mockLocation.description, 'The description is wrong')
      assert.equal(res.body.data.coord[1], mockLocation.coord[1], 'The latitude is wrong')
      assert.equal(res.body.data.coord[0], mockLocation.coord[0], 'The longitude is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
      locationId = res.body.data._id
    } catch (err) {
      throw err
    }
  })

  it('Should get a Location by id', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get(`/location/${locationId}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.name, mockLocation.name, 'The name is wrong')
      assert.equal(res.body.data.description, mockLocation.description, 'The description is wrong')
      assert.equal(res.body.data.coord[1], mockLocation.coord[1], 'The latitude is wrong')
      assert.equal(res.body.data.coord[0], mockLocation.coord[0], 'The longitude is wrong')
      assert.equal(res.body.data._id, locationId, 'The id is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should update a Location', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .put(`/location/${locationId}`)
        .set('Content-Type', 'application/json')
        .send({ description: 'new description' })

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.name, mockLocation.name, 'The name is wrong')
      assert.equal(res.body.data.description, 'new description', 'The description is wrong')
      assert.equal(res.body.data.coord[1], mockLocation.coord[1], 'The latitude is wrong')
      assert.equal(res.body.data.coord[0], mockLocation.coord[0], 'The longitude is wrong')
      assert.equal(res.body.data._id, locationId)
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should delete the specified Location', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .del(`/location/${locationId}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 204, 'The http code is wrong')
      assert.typeOf(res.body.data, 'undefined', `${res.body.data}`)
      assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should calculate the distance between two coordinates correctly', async () => {
    const data = {
      location1: [0.7, 0.8],
      location2: [0.9, 0.5],
      threshold: 50000,
    }

    try {
      const res = await chai
        .request(server.instance)
        .post(`/location/distance`)
        .set('Content-Type', 'application/json')
        .send(data)

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.closeTo(res.body.data.distance, 40091, 0.1, 'The distance is wrong')
      assert.equal(res.body.data.near, true, 'The near field is wrong')
    } catch (err) {
      throw err
    }
  })
})
