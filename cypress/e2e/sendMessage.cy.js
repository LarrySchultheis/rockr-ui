function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

Cypress.Commands.add('login', () => {
    cy.visit('localhost:3000')
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
    cy.contains('Messages').click();
    cy.contains('Larry Schultheis').click();
    const uuid = uuidv4();
    cy.get('input[class="message"').type(uuid);
    cy.get('button[class="sendBtn"]').click();
    cy.contains(uuid);
  })
})