
describe('template spec', () => {
    it('passes', () => {
      cy.visit('localhost:3000')
      cy.contains('Log In').click();
      cy.origin('https://dev-6ary27eqnmjykel3.us.auth0.com', () => {
        const config = Cypress.require('../../cypress-settings.json');

        cy.get('input[id="username"]').type(config.admin_test_user.email);
        cy.get('input[id="password"]').type(config.admin_test_user.password);
        cy.contains('Continue').click({force: true});
      })
      cy.contains('Admin Management').click()
    })
  })