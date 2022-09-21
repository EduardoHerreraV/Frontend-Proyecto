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

  it('visit Task', () => {
    cy.visit(`${Cypress.env('base_url')}/Task`)
    cy.wait(2000)
  })

  it ('visit btn Create', () => {
    cy.get('.btnCreate').focus().type('{enter}')
    cy.wait(1000)
  })

  it('dates', () => {
    cy.get('.project').type('{downarrow}{enter}').first().click()
    cy.wait(5000)
    cy.get('.project').type('{downarrow}{enter}').first().click()
    cy.get('.name').type('Tarea Cypress')
    cy.wait(2000)
    cy.get('.description').type('Descripcion tarea Cypress')
    cy.wait(2000)
    cy.get('.project').type('{downarrow}{enter}').first().click()
    cy.get('.sprint').type('5')
    cy.wait(2000)
    cy.get('.dependencies').type('INFOTEC')
    cy.wait(2000)
    cy.get('.size').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.phase').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.planned_hours').type('50')
    cy.wait(2000)
  })

  it('Save', () => {
    cy.get('.btnAcept').click()
    cy.wait(2000)
  })

  it('Edit', () => {
    cy.get('.btnEdit').first().click()
    cy.wait(2000)
  })

  it('dates', () => {
    cy.get('.project').type('{downarrow}{enter}').click()
    cy.wait(5000)
    cy.get('.name').type('Tarea Cypress Editada')
    cy.wait(2000)
    cy.get('.description').type('Descripcion tarea Cypress editada')
    cy.wait(2000)
    cy.get('.sprint').type('100')
    cy.wait(2000)
    cy.get('.dependencies').type('Pruebas')
    cy.wait(2000)
    cy.get('.size').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.phase').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.planned_hours').type('500')
    cy.wait(2000)
  })

  it('BtnUpdate', () => {
    cy.get('.btnUpdate').first().click()
    cy.wait(2000)
  })

  it('BtnStatus', () => {
    cy.get('.btnstatus').first().click()
    cy.wait(2000)
  })

  it('dates', () => {
    cy.get('.cancel_task').first('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.notes').type('Esto es una prueba')
    cy.wait(2000)
  })

  it('Save', () => {
    cy.get('.btnSave').first().click()
    cy.wait(2000)
  })

  it('visit Task', () => {
    cy.visit(`${Cypress.env('base_url')}/Task`)
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
