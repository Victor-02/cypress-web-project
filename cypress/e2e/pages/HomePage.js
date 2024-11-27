class HomePage {
    visitDailySales() {
        cy.get('[href="/ofertas-do-dia"] > .flex_column > .d_flex > img').click();
    }

    selectFirstProduct() {
        cy.get('.main-img').first().click();
    }
}

export default HomePage;