import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'

import { ContentModel } from '../db/content.db'
import { UserModel } from '../db/user.db'
import { server } from '../server'

chai.use(chaiHttp)

describe('Contents', () => {
  let contentId: string
  let token: string

  const mockContent = {
    title: 'An awesome title!',
    description: 'An awesome test!',
  }

  const mockUser = {
    username: 'test',
    password: '1234',
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },

    email: 'email@example.com',
  }

  before(async () => {
    try {
      await server.start()
      await ContentModel.deleteMany({})
      await UserModel.deleteMany({})

      await chai
        .request(server.instance)
        .post('/user')
        .set('Content-Type', 'application/json')
        .send(mockUser)

      const res = await chai
        .request(server.instance)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: mockUser.username, password: mockUser.password })

      token = res.body.data
    } catch (err) {
      throw err
    }
  })

  after(async () => server.shutdown())

  it('Should get all Content from db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get(`/content`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.typeOf(res.body.data, 'array', `The response is ill-formed: ${res.body.data}`)
      assert.lengthOf(res.body.data, 0, 'There are elements in the response')
    } catch (err) {
      throw err
    }
  })

  it('Should create a new Content in db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .post(`/content`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send(mockContent)

      assert.equal(res.status, 201, 'The http code is wrong')
      assert.equal(res.body.data.title, mockContent.title, 'The title is wrong')
      assert.equal(res.body.data.description, mockContent.description, 'The description is wrong')
      assert.lengthOf(res.body.errors, 0, `${res.body.errors}`)
      contentId = res.body.data._id
    } catch (err) {
      throw err
    }
  })

  it('Should get a Content by id', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .get(`/content/${contentId}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.title, mockContent.title, 'The title is wrong')
      assert.equal(res.body.data.description, mockContent.description, 'The description is wrong')
      assert.lengthOf(res.body.errors, 0, `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should update a Content in db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .put(`/content/${contentId}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({ description: 'An even better test!!!' })

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.title, mockContent.title, 'The title is wrong')
      assert.equal(res.body.data.description, 'An even better test!!!', 'The description is wrong')
      assert.lengthOf(res.body.errors, 0, `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should delete a Content from db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .del(`/content/${contentId}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'applciation/json')

      assert.equal(res.status, 204, 'The http code is wrong')
      assert.typeOf(res.body.data, 'undefined', `${res.body.data}`)
    } catch (err) {
      throw err
    }
  })
})
