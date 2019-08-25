import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'

import { ContentModel } from '../db/content.db'
import { server } from '../server'

chai.use(chaiHttp)

describe('Contents', () => {
  let contentId: string

  const mockContent = {
    title: 'An awesome title!',
    description: 'An awesome test!',
  }

  before(async () => {
    try {
      await server.start()
      await ContentModel.deleteMany({})
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
        .set('Content-Type', 'application/json')
        .send(mockContent)

      assert.equal(res.status, 201, 'The http code is wrong')
      assert.equal(res.body.data.title, mockContent.title, 'The title is wrong')
      assert.equal(res.body.data.description, mockContent.description, 'The description is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
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
        .set('Content-Type', 'application/json')

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.title, mockContent.title, 'The title is wrong')
      assert.equal(res.body.data.description, mockContent.description, 'The description is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should update a Content in db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .put(`/content/${contentId}`)
        .set('Content-Type', 'application/json')
        .send({ description: 'An even better test!!!' })

      assert.equal(res.status, 200, 'The http code is wrong')
      assert.equal(res.body.data.title, mockContent.title, 'The title is wrong')
      assert.equal(res.body.data.description, 'An even better test!!!', 'The description is wrong')
      assert.typeOf(res.body.errors, 'null', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })

  it('Should delete a Content from db', async () => {
    try {
      const res = await chai
        .request(server.instance)
        .del(`/content/${contentId}`)
        .set('Content-Type', 'applciation/json')

      assert.equal(res.status, 204, 'The http code is wrong')
      assert.typeOf(res.body.data, 'undefined', `${res.body.data}`)
      assert.typeOf(res.body.errors, 'undefined', `${res.body.errors}`)
    } catch (err) {
      throw err
    }
  })
})
