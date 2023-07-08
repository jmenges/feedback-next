import FeedbackActions from "../support/actions/feedback-actions";

const actions = new FeedbackActions();

describe("The feedback functionality", () => {
  /**
   * Test adding a feedback
   */
  it("should allow to add a feedback", () => {
    actions.addFeedback("Test title", "Test description");
    //verify
    cy.get("a[href^='/feedback/").contains("Test title");
  });

  /**
   * Test editing feedback
   */
  it("should allow to edit a feedback", () => {
    //add
    actions.addFeedback("Test title", "Test description");
    //edit
    cy.get("a[href^='/feedback/").contains("Test title").click();
    cy.get("a").contains("Edit Feedback").click();
    actions.editFeedback("Test title edited", "Test description edited");
    //verify
    cy.visit("/");
    cy.get("a[href^='/feedback/").contains("Test title edited");
  });

  /**
   * Test removing a feedback
   */
  it("should allow to remove a feedback", () => {
    //add
    actions.addFeedback("Test title", "Test description");
    //delete
    cy.get("a[href^='/feedback/").contains("Test title").click();
    cy.get("a").contains("Edit Feedback").click();
    actions.removeFeedback();
    //verify
    cy.get("a[href^='/feedback/").contains("Test title").should("not.exist");
  });
});
