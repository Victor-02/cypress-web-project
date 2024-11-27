describe("Cart", () => {
    beforeEach(() => {
        cy.viewport(Cypress.env("desktop"));
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) // Hide fetch/XHR requests
        cy.visit("/");

        cy.intercept("POST", "**/indexes/*/queries?x*", (req) => {
            req.reply({ fixture: 'daily_sales' });
        });
    });

    it('User add product at cart by daily sales', () => {
        cy.get('[href="/ofertas-do-dia"] > .flex_column > .d_flex > img').click();
        cy.get('.main-img').first().click();
        cy.get('.button__product--add_to_cart').click();
        cy.get('[href="/carrinho"]').click();
        cy.get(':nth-child(2) > .cav--c-czedJr').should('have.text', 'Inserir o CEP para calcular');
        cy.get('#CEP').click().type('01153000');
        cy.get('span').contains(/^Calcular$/).click();
        cy.get(':nth-child(2) > .cav--c-czedJr').should('contain.text', 'R$');
        cy.get('span').contains(/^Aplicar$/).click();
        cy.get('span').contains('Digite um código de cupom.').should('be.visible');
        cy.get('span').contains(/^Validar$/).click();
        cy.get('span').contains('Vendedor não encontrado, tente outro!').should('be.visible');
    });

    it('User remove a product from cart', () => {
        cy.get('span').contains(/^Compre agora$/).click();
        cy.get('.main-img').first().click();
        cy.get('.cav--c-cXFryd').should('be.a', 'text');
        cy.get('.button__product--increase').click();
        cy.get('.cav--c-cXFryd').should('be.greaterThan', 1);
        cy.get('span').contains(/^Comprar agora$/).click();
        cy.url().should('include', '/carrinho');
        cy.get('[data-icon="plus"]').click();
        cy.get('.cav--c-cXFryd').then(index => {
            cy.get('[data-icon="plus"]').click();
        })
        cy.get('span').contains('Carrinho vazio ainda?').click();

    });
});