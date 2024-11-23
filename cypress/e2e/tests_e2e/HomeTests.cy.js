Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

describe("Home", () => {
    beforeEach(() => {
        cy.viewport(Cypress.env("desktop"));
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) // Hide fetch/XHR requests
        cy.visit("/");
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





        // cy.intercept({
        //     method: 'GET',
        //     url: /^ https: \/\/[\w-]+\.algolia\.net\/\d+\/indexes\/\*\/queries\?/
        // }, (req) => {
        //     req.reply({
        //         statusCode: 200,
        //         fixture: daily_sales.json
        //     })
        // });
    });
});