Cypress.Commands.add('login', () => {
    cy.visit('https://localhost:3000')
    cy.contains('Log In').click();
    cy.origin('https://dev-6ary27eqnmjykel3.us.auth0.com', () => {
      const config = Cypress.require("../../cypress-settings.json");
      cy.get('input[id="username"]').type(config.test_user.email, {log: false});
      cy.get('input[id="password"]').type(config.test_user.password, {log: false});
      cy.contains('Continue').click({force: true});
    })
})

describe('template spec', () => {
  it('passes', () => {
    cy.login();
    cy.wait(500)
    cy.contains('Messages').click();
    cy.contains('Matches');
    cy.contains('Larry Schultheis').click();
    cy.get('div[class="message__sender"]');
  })
})