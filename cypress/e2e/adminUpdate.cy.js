Cypress.Commands.add('login', () => {
    cy.visit('https://localhost:3000')
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
    let children = cy.get('input[value="aconigsby27"]').parents('tr[class^=MuiTableRow]').children();
    children.get('input[value="Ardelia"]').clear().type('Ardelia1');
    children.get('input[value="Conigsby"]').clear().type('Conigsby1');
    children.get('input[value="aconigsby27"]').clear().type('aconigsby271');
    children.get('input[value="aconigsby27@wp.com"]').clear().type('aconigsby271@wp.com');
    cy.contains('Rows per page:').click();
    cy.reload();

    // Change him back
    children = cy.get('input[value="aconigsby271"]').parents('tr[class^=MuiTableRow]').children();
    children.get('input[value="Ardelia1"]').clear().type('Ardelia');
    children.get('input[value="Conigsby1"]').clear().type('Conigsby');
    children.get('input[value="aconigsby271"]').clear().type('aconigsby27');
    children.get('input[value="aconigsby271@wp.com"]').clear().type('aconigsby27@wp.com');
    cy.contains('Rows per page:').click();
    cy.reload();
  })
})