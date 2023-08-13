
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
    cy.contains('Profile').click();
    cy.contains('Match Profile').click();
    cy.get('button').contains('Reset Password');
    cy.get('button').contains('Pause Account');
    cy.get('button').contains('Band Invitations');
    cy.wait(1500);
    let ct = 0
    cy.get('button[aria-label="Open"]').then($els => {
      [...$els].forEach((e) => {
        e.click({force: true});
        if (ct === 0) {
          cy.contains('bass').click({force: true});
        }
        if (ct === 1) {
          cy.contains('build a band').click({force: true});
        }
        if (ct === 2) {
          cy.contains('singing').click({force: true});
        }
        ct++;
      })
    })
    cy.contains('Match Profile').click();
  })
})