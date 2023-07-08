export default class FeedbackActions {
  addFeedback(title: string, description: string) {
    cy.visit("/feedback/new");
    cy.get("input[name='title'").type(title);
    cy.get("textarea[name='description'").type(description);
    cy.get("button").contains("Post Feedback").click();
  }

  editFeedback(title?: string, description?: string) {
    if (title) cy.get("input[name='title'").clear().type(title);
    if (description)
      cy.get("textarea[name='description'").clear().type(description);
    cy.get("button").contains("Save Changes").click();
  }

  removeFeedback() {
    cy.get("button").contains("Delete").click();
  }
}
