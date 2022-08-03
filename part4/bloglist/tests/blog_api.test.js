const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const helper = require('./test_helper')
const _ = require('lodash')

const api = supertest(app)
const timeout = 10000

beforeEach(async () => {
  await blog.deleteMany({})
  await blog.insertMany(helper.initialBlogs)
})

describe('blog tests', () => {
  test('check initial blogs length', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogs.body).toHaveLength(helper.initialBlogs.length)

  }, timeout)

  test('check blog id', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    blogs.body.map(b => expect(b.id).toBeDefined())
  }, timeout)

  test('add new blog', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'new author',
      url: 'new url',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    Object.keys(newBlog).forEach(key => {
      expect(blogsAtEnd.map(b => b[key])).toContain(newBlog[key])
    })
  }, timeout)

  test('new blog will have likes default to zero', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'new author',
      url: 'new url',
    }

    const newBlog2 = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(newBlog2.body.likes).toBe(0)
  }, timeout)

  test('missing title or url from new blog', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'new author',
      url: 'new url',
      likes: 5
    }

    const noTitleBlog = _.cloneDeep(newBlog)
    delete noTitleBlog.title
    await api.post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    const noURLBlog = _.cloneDeep(newBlog)
    delete noURLBlog.url
    await api.post('/api/blogs')
      .send(noURLBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, timeout)
})

describe('blog deletion', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    expect(blogsAtEnd.map(r => r.title)).not.toContain(blogToDelete.title)
  })
})

describe('blog edit', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]
    blogToEdit.likes += 10

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const edittedBlog = blogsAtEnd.filter(b => b.id === blogToEdit.id)
    expect(edittedBlog[0].likes).toBe(blogToEdit.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})