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
    // WIP test to update user info
    // const children = cy.get('input[value="ttchilders"]').parents('tr[class^=MuiTableRow]').children();
    // children.get('input[value="Tyler"]').type('Tyler1');
    // children.get('input[value="Childers"]').type('Childers1');
    // children.get('input[value="ttchilders"]').type('ttchilders1');
    // children.get('input[value="the_child_man@ky.gov"]').type('the_child_man1@ky.gov');
  })
})