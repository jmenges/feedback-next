export default class UserActions {
  login() {
    cy.visit("/");
    cy.get("button").contains("Sign in").click();
    cy.get("input[name='username'").type("velvetround");
    cy.get("input[name='password'").type("test1234");
    cy.get("button").contains("Submit").click();
    // wait for redirect
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  }
}
