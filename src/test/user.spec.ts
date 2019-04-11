import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'

import { ActivityModel } from '../db/activity.db'
import { ContentModel } from '../db/content.db'
import { LocationModel } from '../db/location.db'
import { UserModel } from '../db/user.db'
import { server } from '../server'

chai.use(chaiHttp)

describe('Users', () => {
  const mockUser = {
    username: 'user',
    password: '1234',
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    email: 'johndoe@example.com',
  }

  const credentials = {
    username: mockUser.username,
    password: mockUser.password,
  }

  const mockLocation = { name: 'test', coord: [1.5, 1.0] }
  const mockLocation2 = { name: 'test2', coord: [0.8, 0.9] }
  const mockLocation3 = { name: 'test3', coord: [0.6, 0.7] }
  const mockContent = { description: 'An awesome test!', correct: 'Yay', wrong: 'Nah' }
  const mockActivity = { title: 'activity', description: 'just passing by', threshold: 42 }

  let userId: string
  let contentId: string
  let locationId: string
  let location2Id: string
  let location3Id: string
  let activityId: string
  let token: string

  before(async () => {
    try {
      await server.start()
      await UserModel.deleteMany({})
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

      res = await chai
        .request(server.instance)
        .post(`/location`)
        .set('Content-Type', 'application/json')
        .send(mockLocation2)
      location2Id = res.body.data._id

      res = await chai
        .request(server.instance)
        .post(`/location`)
        .set('Content-Type', 'application/json')
        .send(mockLocation3)
      location3Id = res.body.data._id

      await chai
        .request(server.instance)
        .put(`/location/${locationId}/${contentId}`)
        .set('Content-Type', 'application/json')

      res = await chai
        .request(server.instance)
        .post(`/activity`)
        .set('Content-Type', 'application/json')
        .send(mockActivity)
      activityId = res.body.data._id

      await chai
        .request(server.instance)
        .put(`/activity/${activityId}`)
        .set('Content-Type', 'application/json')
        .send({
          locations: [locationId, location2Id, location3Id],
        })
    } catch (err) {
      throw err
    }
  })

  after(async () => server.shutdown())

  it('Should create a new user', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .post(`/user`)
        .set('Content-Type', 'application/json')
        .send(mockUser)

      assert.equal(res.status, 201, 'The http code is wrong')
      assert.equal(res.body.data.username, mockUser.username, 'The username is wrong')
      assert.equal(res.body.data.name.firstName, mockUser.name.firstName, 'The first name is wrong')
      assert.equal(res.body.data.name.lastName, mockUser.name.lastName, 'The last name is wrong')
      assert.equal(res.body.data.email, mockUser.email, 'The e-mail is wrong')
    } catch (err) {
      throw err
    }
  })

  it('Should log in', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .post(`/login`)
        .set('Content-Type', 'application/json')
        .send(credentials)

      assert.equal(res.status, 200, 'The http code is wrong')
      token = res.body.data.token
    } catch (err) {
      throw err
    }
  })

  it('Should show info from the logged user', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get(`/user`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'applicaiton/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.username, mockUser.username, 'The username is wrong')
      assert.equal(res.body.data.name.firstName, mockUser.name.firstName, 'The first name is wrong')
      assert.equal(res.body.data.name.lastName, mockUser.name.lastName, 'The last name is wrong')
      assert.equal(res.body.data.email, mockUser.email, 'The e-mail is wrong')
    } catch (err) {
      throw err
    }
  })

  it('Should delete an logged user', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .del(`/user`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 204, 'The http code is wrong')
      assert.equal(await UserModel.findById(userId), undefined, 'The user is not undefined')
    } catch (err) {
      throw err
    }
  })
})
