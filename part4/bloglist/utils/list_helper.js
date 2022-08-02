var _ = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes >= b.likes)? a : b)
}

const mostBlogs = (blogs) => {
  let blogCount = _.countBy(blogs, b => b.author)
  let mb = Object.entries(blogCount).reduce((a, b) => a[1] >= b[1] ? a : b)
  return {
    author: mb[0], blogs: mb[1]
  }
}

const mostLikes = (blogs) => {
  let authorBlogMap = _.groupBy(blogs, b => b.author)
  let authorLikes = []
  _.forEach(authorBlogMap, (val, key) => {
    authorLikes.push({
      author: key,
      likes: val.map(b => b.likes).reduce((a, b) => a + b)
    })
  })
  return _.maxBy(authorLikes, 'likes')
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}