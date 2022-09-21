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
    cy.wait(3000)
  })

  it('login btn', () => {
    cy.get('.loginBtn').focus().type('{enter}')
    cy.wait(3000)
  })

  it('visit Project', () => {
    cy.visit(`${Cypress.env('base_url')}/project`)
    cy.wait(2000)
  })

  it('visit btn Create', () => {
    cy.get('.btnCreate').focus().type('{enter}')
    cy.wait(6000)
  })

  it('dates', () => {
    cy.get('.numberProject').type('5')
    cy.wait(2000)
    cy.get('.nameProject').type('INFOTEC')
    cy.wait(2000)
    cy.get('.startDate').type('2020-10-01')
    cy.wait(2000)
    cy.get('.endDate').type('2020-12-01')
    cy.wait(2000)
  })

  it('Save', () => {
    cy.get('.btnAccept').click()
    cy.wait(2000)
  })

  it('Edit', () => {
    cy.get('.btnEdit').first().click()
    cy.wait(2000)
  })

  it('Update', () => {
    cy.get('.numberProject').type('15')
    cy.wait(2000)
    cy.get('.nameProject').type('INFOTEC 2022')
    cy.wait(2000)
    cy.get('.startDate').type('2020-06-01')
    cy.wait(2000)
    cy.get('.endDate').type('2020-10-01')
    cy.wait(2000)
  })

  it('BtnUpdate', () => {
    cy.get('.btnUpdate').click()
    cy.wait(2000)
  })

  it('delete', () => {
    cy.get('.btnDelete').first().click()
    cy.wait(2000)
  })

  it('Confirm delete', () => {
    cy.get('.aceptEliminacion').first().click()
    cy.wait(2000)
  })

  it('logout', () => {
    cy.get('.avatar').click()
    cy.wait(2000)
    cy.get('.btnLogout').click()
    cy.wait(2000)
    cy.get('.btnConfirmLogout').click()
    cy.wait(2000)
  })
})
