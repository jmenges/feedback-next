import UserActions from "../support/actions/user-actions";

const userActions = new UserActions();

describe("The user functionality", () => {
  it("should allow to login", () => {
    userActions.login();
    //verify
    cy.url().should("contain", "/");
    cy.get("button").contains("Sign in").should("not.exist");
  });
});
