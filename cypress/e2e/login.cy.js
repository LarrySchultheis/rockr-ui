describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.contains('Log In').click();
    cy.origin('https://dev-6ary27eqnmjykel3.us.auth0.com', () => {
      cy.get('input[id="username"]').type('rockrtestuser@gmail.com');
      cy.get('input[id="password"]').type('r0ckAndRoll1986');
      cy.contains('Continue').click({force: true});
    })


  })
})