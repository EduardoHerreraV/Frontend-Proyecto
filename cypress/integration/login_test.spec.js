describe('Login test', () => {
  it('visit', () => {
    cy.visit(Cypress.env('base_url'))
  })

  it('Set credentials.user', () => {
    cy.get('.userInput').type('marcosp')
    cy.wait(5000)
  })

  it('Set credentials.password', () => {
    cy.get('.passwordInput').type('12345678')
    cy.wait(5000)
  })

  it('login btn', () => {
    cy.get('.loginBtn').focus().type('{enter}')
    cy.wait(5000)
  })

  it('logout', () => {
    cy.get('.avatar').click()
    cy.wait(5000)
    cy.get('.btnLogout').click()
    cy.wait(5000)
    cy.get('.btnConfirmLogout').click()
    cy.wait(5000)
  })

})
