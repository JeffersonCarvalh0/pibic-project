import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'
import mocha from 'mocha'
import mongoose from 'mongoose'

import { ActivityModel } from '../db/activity.db'
import { ContentModel } from '../db/content.db'
import { LocationModel } from '../db/location.db'
import { server } from '../server'

chai.use(chaiHttp)

describe('Activities', () => {
  const mockLocation = { name: 'test', coord: [1.5, 1.0] }
  const mockContent = { description: 'An awesome test!', correct: 'Yay', wrong: 'Nah' }
  const mockActivity = { title: 'activity', description: 'just passing by' }

  let contentId: string
  let locationId: string
  let activityId: string

  before(async () => {
    try {
      await server.start()
      await ContentModel.deleteMany({})
      await LocationModel.deleteMany({})
      await ActivityModel.deleteMany({})

      let res = await chai
        .request(server.instance)
        .post(`/content`)
        .set('Content-Type', 'application/json')
        .send(mockContent)
      contentId = res.body.data._id

      res = await chai
        .request(server.instance)
        .post(`/location`)
        .set('Content-Type', 'application/json')
        .send(mockLocation)
      locationId = res.body.data._id
    } catch (err) {
      throw err
    }
  })

  after(async () => server.shutdown())

  it('Should get all Activities in the db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get(`/activity`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`)
      assert.lengthOf(res.body.data, 0, 'There are elements in the response')
    } catch (err) {
      throw err
    }
  })

  it('Should create a new Activiy in the db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .post(`/activity`)
        .set('Content-Type', 'application/json')
        .send(mockActivity)

      assert.equal(res.status, 201, 'The http code is wrong')
      assert.equal(res.body.data.title, mockActivity.title, 'The title is wrong')
      assert.equal(res.body.data.description, mockActivity.description, 'The description is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
      activityId = res.body.data._id
    } catch (err) {
      throw err
    }
  })

  it('Should get an Activity by id', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get(`/activity/${activityId}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.title, mockActivity.title, 'The title is wrong')
      assert.equal(res.body.data.description, mockActivity.description, 'The description is wrong')
      assert.equal(res.body.data._id, activityId, 'The id is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should update an Activity', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .put(`/activity/${activityId}`)
        .set('Content-Type', 'application/json')
        .send({
          description: 'description updated',
          location: locationId,
          content: contentId,
        })

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.title, mockActivity.title, 'The title is wrong')
      assert.equal(res.body.data.description, 'description updated', 'The description is wrong')
      assert.equal(res.body.data.location._id, locationId, "The activity's id is wrong")
      assert.equal(res.body.data.content._id, contentId, "The content's id is wrong")
      assert.equal(res.body.data._id, activityId, 'The id is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should delete an Activity from the db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .del(`/activity/${activityId}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 204, 'The http code is wrong')
      assert.typeOf(res.body.data, 'undefined', `${res.body.data}`)
      assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })
})
