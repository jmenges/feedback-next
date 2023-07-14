import FeedbackActions from "../support/actions/feedback-actions";
import UserActions from "../support/actions/user-actions";

const actions = new FeedbackActions();
const userActions = new UserActions();

/* Functions */
const uuid = () => Cypress._.random(0, 1e6);
const getRandomTitle = () => `Test title - ${uuid()}`;

describe("The feedback functionality", () => {
  describe("given an authenticated user", () => {
    beforeEach(() => {
      // login user
      userActions.login();
    });

    /**
     * Adding feedback
     */
    it("should allow to add a feedback", () => {
      const title = getRandomTitle();

      // add feedback
      actions.addFeedback(title, "Test description");

      //verify
      cy.visit("/");
      cy.get("a[href^='/feedback/").contains(title);
    });

    /**
     * Editing feedback
     */
    it("should allow to edit a feedback", () => {
      const title = getRandomTitle();
      const titleEdited = getRandomTitle();

      //add
      actions.addFeedback(title, "Test description");

      //edit
      cy.get("a[href^='/feedback/").contains(title).click();
      cy.get("a").contains("Edit Feedback").click();
      actions.editFeedback(titleEdited, "Test description edited");

      //verify
      cy.visit("/");
      cy.get("a[href^='/feedback/").contains(titleEdited);
    });

    /**
     * Removing a feedback
     */
    it("should allow to remove a feedback", () => {
      const title = getRandomTitle();

      //add
      actions.addFeedback(title, "Test description");

      //delete
      cy.get("a[href^='/feedback/").contains(title).click();
      cy.get("a").contains("Edit Feedback").click();
      actions.removeFeedback();

      //verify
      cy.get("a[href^='/feedback/").contains(title).should("not.exist");
    });

    /**
     * Upvoting a feedback
     */
    it("should allow to upvote a feedback", () => {
      cy.get("a[href^='/feedback/']:not([href$='/feedback/new'])")
        .find("button:not([aria-selected='true'])")
        .first()
        .parents("a")
        .invoke("attr", "href")
        .then((feedbackHref) => {
          // storing href for later use
          cy.log(feedbackHref || "");
          expect(feedbackHref).to.not.be.empty;

          // get current count
          cy.get(`a[href='${feedbackHref}']`)
            .find("button span")
            .invoke("text")
            .then((count) => {
              const countBefore = Number(count);

              // upvote
              cy.get(`a[href='${feedbackHref}']`)
                .find("button")
                .first()
                .click();
              cy.wait(50);

              //verify upvote count
              cy.get(`a[href='${feedbackHref}']`)
                .find("button span")
                .invoke("text")
                .then((count) => {
                  const countAfter = Number(count);
                  expect(countAfter).to.be.greaterThan(countBefore);
                });
            });
        });
    });

    /**
     * Removing upvote of a feedback
     */
    it("should allow to remove a upvote of a feedback", () => {
      cy.get("a[href^='/feedback/']:not([href$='/feedback/new'])")
        .find("button:not([aria-selected='false'])")
        .first()
        .parents("a")
        .invoke("attr", "href")
        .then((feedbackHref) => {
          // storing href for later use
          cy.log(feedbackHref || "");
          expect(feedbackHref).to.not.be.empty;

          // get current count
          cy.get(`a[href='${feedbackHref}']`)
            .find("button span")
            .invoke("text")
            .then((count) => {
              const countBefore = Number(count);

              // remove uptovte
              cy.get(`a[href='${feedbackHref}']`)
                .find("button")
                .first()
                .click();
              cy.wait(50);

              //verify upvote count
              cy.get(`a[href='${feedbackHref}']`)
                .find("button span")
                .invoke("text")
                .then((count) => {
                  const countAfter = Number(count);
                  expect(countAfter).to.be.lessThan(countBefore);
                });
            });
        });
    });
  });
});
