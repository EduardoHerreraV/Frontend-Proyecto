describe('TaskAssignment test', () => {
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

  it('visit TaskAssignment', () => {
    cy.visit(`${Cypress.env('base_url')}/task-assignment`)
    cy.wait(2000)
  })

  it ('visit btn Create', () => {
    cy.get('.btnCreate').focus().type('{enter}')
    cy.wait(6000)
  })

  it('dates', () => {
    cy.get('.psp').type('adriana')
    cy.get('.psp').type('{downarrow}{enter}').click()
    cy.wait(5000)
    cy.get('.choose_project').type('{downarrow}{enter}').click()
    cy.wait(5000)
    cy.get('.choose_task').type('{downarrow}{enter}').click()
    cy.wait(5000)
    cy.get('.start_date').type('2020-10-01')
    cy.wait(2000)
    cy.get('.comment').type('Test')
    cy.wait(2000)
  })

  it('Save', () => {
    cy.get('.btnSave').click()
    cy.wait(2000)
  })

  it('logout', () => {
    cy.get('.avatar').click()
    cy.wait(3000)
    cy.get('.btnLogout').click()
    cy.wait(3000)
    cy.get('.btnConfirmLogout').click()
    cy.wait(3000)
  })

})
