describe("Home", () => {
    beforeEach(() => {
        cy.viewport(Cypress.env("desktop"));
        cy.visit("/");
    });

    it.skip("Verify endpoint", () => {
        cy.url().should('contains', '/home');
    });
});