describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('My testing blog')
      cy.get('#author').type('George Washington')
      cy.get('#url').type('http://example.com/')
      cy.get('#create-button').click()

      cy.get('#blog-list').contains('My testing blog')
      cy.get('#blog-list').contains('George Washington')
    })

    it('A user can like a blog', function () {
      cy.createBlog({
        title: 'Likeable Blog',
        author: 'Tiesto',
        url: 'http://test.com/',
        likes: 2,
      })
      cy.contains('Likeable Blog')
        .parent()
        .find('.blog-toggle')
        .as('toggleButton')
      cy.get('@toggleButton').click()
      cy.contains('likes 2')
      cy.get('.blog-like-button').click()
      cy.contains('likes 3')
    })

    describe('Deleting a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Of Mice and Men',
          author: 'John Steinbeck',
          url: 'http://example.com',
        })
      })
      it.only('user who created can', function () {
        cy.contains('Of Mice and Men')
          .parent()
          .find('.blog-toggle')
          .as('toggleButton')
        cy.get('@toggleButton').click()
        cy.get('.remove-blog-button').click()
        cy.get('html').should('not.contain', 'Of Mice and Men')
      })
      // it('user who did not create cannot', function () {
      //   cy.contains('gotta fix this')
      // })
    })
  })
})
