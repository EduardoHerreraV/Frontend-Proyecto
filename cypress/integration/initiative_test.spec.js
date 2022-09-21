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

  it('visitnInitiative', () => {
    cy.visit(`${Cypress.env('base_url')}/initiative`)
    cy.wait(2000)
  })

  it('visit btn Create', () => {
    cy.get('.btnCreate').focus().type('{enter}')
    cy.wait(6000)
  })

  it('dates', () => {
    cy.get('.project').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.name').type('Prueba Cypress')
    cy.wait(3000)
    cy.get('.repository_name').type('Repositorio prueba')
    cy.wait(2000)
    cy.get('.name').type('Nombre de Prueba')
    cy.wait(2000)
    cy.get('.repository_name').type('Repositorio de Prueba')
    cy.wait(2000)
    cy.get('.url').type('URL de Prueba')
    cy.wait(2000)
    cy.get('.description').type('Descripcion de Prueba')
    cy.wait(2000)
    cy.get('.cat_knowledge_area_types_id').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.cat_specific_knowledge_id').type('{downarrow}{enter}').click()
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

  it('dates', () => {
    cy.get('.project_id').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.name').type('2')
    cy.wait(2000)
    cy.get('.repository_name').type('2')
    cy.wait(2000)
    cy.get('.url').type('2')
    cy.wait(2000)
    cy.get('.description').type('2')
    cy.wait(2000)
    cy.get('.cat_knowledge_area_types_id').type('{downarrow}{enter}').click()
    cy.wait(2000)
    cy.get('.cat_specific_knowledge_id').type('{downarrow}{enter}').click()
    cy.wait(2000)
  })

  it('BtnUpdate', () => {
    cy.get('.btnAccept').click()
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
