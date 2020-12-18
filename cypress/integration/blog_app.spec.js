describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { username: 'matt', password: 'password' }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe.only('create 3 blogs', function() {
    beforeEach(function() {
      cy.login({ username: 'matt', password: 'password' })
      cy.createNote({ author: 'author1', title: 'title1', url: 'url1', likes: 1 })
      cy.createNote({ author: 'author2', title: 'title2', url: 'url2', likes: 2 })
      cy.createNote({ author: 'author3', title: 'title3', url: 'url3', likes: 3 })
      cy.createNote({ author: 'author4', title: 'title4', url: 'url4', likes: 4 })
    })

    it('blogs ordered by likes', function() {
      cy.contains('view')
        .click()
      cy.contains('likes 4')
      cy.contains('view')
        .click()
      cy.contains('likes 3')
      cy.contains('view')
        .click()
      cy.contains('likes 2')
      cy.contains('view')
        .click()
      cy.contains('likes 1')
    })
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('matt')
      cy.get('#password')
        .type('password')
      cy.get('#login')
        .click()
      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('matt')
      cy.get('#password')
        .type('assword')
      cy.get('#login')
        .click()
      cy.contains('login')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('matt')
      cy.get('#password')
        .type('password')
      cy.get('#login')
        .click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('cypress is nifty')
      cy.get('#author')
        .type('cy')
      cy.get('#url')
        .type('fakepath')
      cy.get('#create')
        .click()
      cy.contains('nifty')
    })

    describe('When blog created', function() {
      beforeEach(function() {
        cy.contains('new blog')
          .click()
        cy.get('#title')
          .type('cypress is nifty')
        cy.get('#author')
          .type('cy')
        cy.get('#url')
          .type('fakepath')
        cy.get('#create')
          .click()
      })

      it('blog can be liked', function() {
        cy.contains('view')
          .click()
        cy.get('#like')
          .click()
        cy.contains('1')
      })

      it('blog can be deleted by user', function() {
        cy.contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('html').should('not.contain', 'view')
      })
    })
  })
})

