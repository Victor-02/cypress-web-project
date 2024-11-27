import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

const homePage = new HomePage()
const productPage = new ProductPage()
const cartPage = new CartPage()

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

describe("Cart", () => {
    beforeEach(() => {
        cy.viewport(Cypress.env("desktop"));
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }); // Hide fetch/XHR requests
        cy.visit("/");

        cy.intercept("POST", "**/indexes/*/queries?x*", (req) => {
            req.reply({ fixture: 'daily_sales' });
        });
    });

    it('User add product at cart by daily sales', () => {
        homePage.visitDailySales();
        homePage.selectFirstProduct();
        productPage.addToCart();
        cartPage.goToCart();
        cartPage.verifyCEPMessage();
        cartPage.enterCEP('01153000');
        cartPage.calculateShipping();
        cartPage.verifyShippingPrice();
        cartPage.applyCoupon();
        cartPage.verifyInvalidCouponMessage();
        cartPage.validateCoupon();
        cartPage.verifyInvalidSellerMessage();
    });

    it('User remove a product from cart', () => {
        cartPage.clickBuyNow();
        homePage.selectFirstProduct();
        cartPage.increaseQuantity();
        cartPage.verifyQuantity(2);
        cartPage.goToCart();
        cartPage.verifyCartEmptyMessage();
    });
});
