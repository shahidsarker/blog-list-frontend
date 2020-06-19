describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
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
      cy.contains('gotta fix this')
    })

    it('fails with wrong credentials', function () {
      cy.contains('gotta fix this')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('gotta fix this')
    })

    it('A blog can be created', function () {
      cy.contains('gotta fix this')
    })

    it('A user can like a blog', function () {
      cy.contains('gotta fix this')
    })

    describe('Deleting a blog', function () {
      it('user who created can', function () {
        cy.contains('gotta fix this')
      })
      it('user who did not create cannot', function () {
        cy.contains('gotta fix this')
      })
    })
  })
})
