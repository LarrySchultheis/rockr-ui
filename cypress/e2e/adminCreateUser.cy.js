Cypress.Commands.add('login', () => {
    cy.visit('localhost:3000')
    cy.contains('Log In').click();
    cy.origin('https://dev-6ary27eqnmjykel3.us.auth0.com', () => {
      const config = Cypress.require("../../cypress-settings.json");
      cy.get('input[id="username"]').type(config.admin_test_user.email, {log: false});
      cy.get('input[id="password"]').type(config.admin_test_user.password, {log: false});
      cy.contains('Continue').click({force: true});
    })
})

describe('template spec', () => {
  it('passes', () => {
    cy.login()
    cy.contains('Admin Management').click()
    cy.get('button').contains('Create User').click();
    cy.get('input[placeholder="First Name"]').type('Cypress');
    cy.get('input[placeholder="Last Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('cytestuser@yahoo.com');
    cy.get('input[placeholder="Password"]').type('B@dPa$$w0rdThatWillBeDeleted');
    cy.get('input[placeholder="Username"]').type('cytestuser');
    cy.get('button').contains('Submit').click();
    // Delete user
    cy.get('input[value="Cypress"]').parents('tr[class^=MuiTableRow]').children('td').children('button').click();
    cy.get('input[value="Cypress"]').should('not.exist')
  })
})