
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
const config = require("../../cypress-settings.json");
describe('template spec', () => {
  it('passes', () => {
    cy.login();
    cy.wait(500);
    cy.contains('Profile').click();
    cy.contains('Personal Details');
    cy.get('input[placeholder="First Name"]').should('have.value', config.test_user.firstname);
    cy.get('input[placeholder="Last Name"]').should('have.value', config.test_user.lastname);
    cy.get('button').contains('Band Invitations');
    cy.get('button').contains('Reset Password');
    cy.get('button').contains('Pause Account');
    cy.get('input[placeholder="First Name"]').clear().type(`${config.test_user.firstname} update`);
    cy.get('input[placeholder="Last Name"]').clear().type(`${config.test_user.lastname} update`);
    cy.get('input[placeholder="Username"]').click();
    cy.reload();
    cy.get('input[placeholder="First Name"]').should('have.value', `${config.test_user.firstname} update`);
    cy.get('input[placeholder="Last Name"]').should('have.value', `${config.test_user.lastname} update`);
    cy.get('input[placeholder="First Name"]').clear().type(config.test_user.firstname);
    cy.get('input[placeholder="Last Name"]').clear().type(config.test_user.lastname);
    cy.get('input[placeholder="Username"]').click();
    cy.reload();
    cy.get('input[placeholder="First Name"]').should('have.value', config.test_user.firstname);
    cy.get('input[placeholder="Last Name"]').should('have.value', config.test_user.lastname);
})
})