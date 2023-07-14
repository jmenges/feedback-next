describe("The home page", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });
  /**
   * Test if page has feedbacks
   */
  it("has a list of feedbacks", () => {
    cy.visit("/");
    cy.get("a[href^='/feedback/']").should("exist");
  });
  /**
   * Test one filter function
   */
  it("should allow to filter by status (e.g. Enhancement)", () => {
    cy.visit("/");
    cy.get("a[href^='/feedback/']")
      .its("length")
      .then((allItemsCount) => {
        cy.log(String(allItemsCount));
        cy.get("button").contains("Enhancement").click();
        cy.get("a[href^='/feedback/']")
          .its("length")
          .should("be.lessThan", allItemsCount);
      });
  });
  /**
   * Test one sorting function
   */
  it("should allow to sort by least comments", () => {
    cy.visit("/");
    cy.get("button").contains("Sort by").click();
    cy.findByText("Least Comments").click();
    cy.wait(50);
    cy.get("a[href^='/feedback/'] [data-cy='feedback-count']").then(
      (counts) => {
        let lastCount = 0;
        counts.each((index, count) => {
          const currentCount = Number(count.textContent);
          cy.log(String(currentCount));
          expect(currentCount).to.be.gte(lastCount);
          lastCount = currentCount;
        });
      }
    );
  });
});
