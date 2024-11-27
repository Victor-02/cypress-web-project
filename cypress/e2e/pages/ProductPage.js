class ProductPage {
    addToCart() {
        cy.get('.button__product--add_to_cart').click();
    }
}

export default ProductPage;