const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 } )
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    const body = request.body

    const c = new Comment({
      comment: body.comment,
      blog: blog._id
    })
    const savedC = await c.save()

    blog.comments = blog.comments.concat(savedC._id)
    await blog.save()

    response.json(savedC)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  } else if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  } else if (!blog.user) {
    return response.status(401).json({ error: 'invalid blog user' })
  } else if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
  }

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }).toJSON()

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter