import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'

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

  let userId: string
  let token: string

  before(async () => {
    try {
      await server.start()
      await UserModel.deleteMany({})
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
      token = res.body.data
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
        .set('Content-Type', 'application/json')

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
