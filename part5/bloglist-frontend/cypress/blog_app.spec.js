describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    let user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)

    user = {
      name: 'root',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-username').should('contain', '')
    cy.get('#login-password').should('contain', '')
    cy.get('#login-submit').should('contain', 'login')

    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#login-username').type('mluukkai')
      cy.get('#login-password').type('salainen')
      cy.get('#login-submit').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#login-username').type('mluukkai')
      cy.get('#login-password').type('sal')
      cy.get('#login-submit').click()

      cy.contains('log in to application')
      cy.contains('Request failed with status code 401')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in user here
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('Matti Luukkainen logged in')

      cy.get('Button').contains('create new blog').click()

      cy.get('#blogform-title').type('new title')
      cy.get('#blogform-author').type('new author')
      cy.get('#blogform-url').type('url')
      cy.get('#blogform-submit').click()

      cy.contains('new title new author')
    })

    describe('When a number of blog is created', function () {
      beforeEach(function () {
        const lstore = JSON.parse(localStorage.getItem('loggedBlogappUser'))

        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/blogs',
          headers: { Authorization: `Bearer ${lstore.token}` },
          body: {
            title: 'new title 1',
            author: 'new author 1',
            url: 'url',
          }
        })

        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/blogs',
          headers: { Authorization: `Bearer ${lstore.token}` },
          body: {
            title: 'new title 2',
            author: 'new author 2',
            url: 'url',
          }
        })

        cy.visit('http://localhost:3000')
      })

      it.only('Like a blog and check order', function () {
        cy.get('.blog').eq(0).as('blog1')
        cy.get('.blog').eq(1).as('blog2')

        cy.get('@blog1').contains('view').click()
        for (let i = 0; i < 3; i++) {
          cy.get('@blog1').find('#blog-like').click()
          cy.wait(500)
        }
        cy.get('@blog1').contains('likes 3')

        cy.get('@blog2').contains('view').click()
        for (let i = 0; i < 5; i++) {
          cy.get('@blog2').find('#blog-like').click()
          cy.wait(500)
        }
        cy.get('@blog2').contains('likes 5')

        // check the order
        cy.visit('http://localhost:3000')

        cy.get('.blog').eq(0).as('blog1')
        cy.get('.blog').eq(1).as('blog2')

        cy.get('@blog1').contains('new title 2 new author 2')
        cy.get('@blog2').contains('new title 1 new author 1')
      })

      it('Delete a blog', function () {
        cy.get('.blog').eq(0).as('blog1')
        cy.get('@blog1').find('#blog-delete').click()
        cy.get('html').should('not.contain', 'new title 1 new author 1')
      })
    })
  })

  // it('front page can be opened', function () {
  //   cy.contains('Notes')
  //   cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  // })

  // it('front page contains random text', function () {
  //   cy.contains('wtf is this app?')
  // })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#login-username').type('root')
      cy.get('#login-password').type('sekret')
      cy.get('#login-submit').click()
    })

    it('a new blog can be created', function () {
      // ...
    })
  })
})