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
    cy.contains('Admin Management').click();
    // Change ty man
    let children = cy.get('input[value="ttchilders"]').parents('tr[class^=MuiTableRow]').children();
    children.get('input[value="Tyler"]').clear().type('Tyler1');
    children.get('input[value="Childers"]').clear().type('Childers1');
    children.get('input[value="ttchilders"]').clear().type('ttchilders1');
    children.get('input[value="the_child_man@ky.gov"]').clear().type('the_child_man1@ky.gov');
    cy.contains('Save').click();
    cy.reload();

    // Change him back
    children = cy.get('input[value="ttchilders1"]').parents('tr[class^=MuiTableRow]').children();
    children.get('input[value="Tyler1"]').clear().type('Tyler');
    children.get('input[value="Childers1"]').clear().type('Childers');
    children.get('input[value="ttchilders1"]').clear().type('ttchilders');
    children.get('input[value="the_child_man1@ky.gov"]').clear().type('the_child_man@ky.gov');
    cy.contains('Save').click();

  })
})