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

    it.only('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('blog author')
      cy.get('#url').type('http://example.com/')
      cy.get('#create-button').click()

      cy.contains('a new blog')
      cy.contains('blog author')
      cy.contains('view').click()
      cy.contains('http://example.com/')
      cy.contains('likes 0')
    })

    // it('A user can like a blog', function () {
    //   cy.contains('gotta fix this')
    // })

    // describe('Deleting a blog', function () {
    //   it('user who created can', function () {
    //     cy.contains('gotta fix this')
    //   })
    //   it('user who did not create cannot', function () {
    //     cy.contains('gotta fix this')
    //   })
    // })
  })
})
