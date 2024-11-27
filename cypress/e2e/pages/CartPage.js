class CartPage {
    goToCart() {
        cy.get('[href="/carrinho"]').click();
    }

    verifyCEPMessage() {
        cy.get(':nth-child(2) > .cav--c-czedJr').should('have.text', 'Inserir o CEP para calcular');
    }

    enterCEP(cep) {
        cy.get('#CEP').click().type(cep);
    }

    calculateShipping() {
        cy.get('span').contains(/^Calcular$/).click();
    }

    verifyShippingPrice() {
        cy.get(':nth-child(2) > .cav--c-czedJr').should('contain.text', 'R$');
    }

    applyCoupon() {
        cy.get('span').contains(/^Aplicar$/).click();
    }

    verifyInvalidCouponMessage() {
        cy.get('span').contains('Digite um código de cupom.').should('be.visible');
    }

    validateCoupon() {
        cy.get('span').contains(/^Validar$/).click();
    }

    verifyInvalidSellerMessage() {
        cy.get('span').contains('Vendedor não encontrado, tente outro!').should('be.visible');
    }

    verifyCartEmptyMessage() {
        cy.get('h3').contains('Carrinho vazio ainda?').click();
    }

    clickBuyNow() {
        cy.get('span').contains(/^Compre agora$/).click();
    }

    increaseQuantity() {
        cy.get('.button__product--increase').click();
    }

    verifyQuantity(expectedQuantity) {
        cy.get('.cav--c-cXFryd').should('have.value', expectedQuantity);
    }
}

export default CartPage;