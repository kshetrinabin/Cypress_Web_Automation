describe('SauceDemo E2E Flow', () => {
  const baseUrl = 'https://www.saucedemo.com/';

  before(() => {
    cy.visit(baseUrl);
  });

  it('Login with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('Add item to cart and go to cart page', () => {
    // Add first product to cart
    cy.get('.inventory_item').first().within(() => {
      cy.contains('Add to cart').click();
    });

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
  });

  it('Proceed to checkout with user information', () => {
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Fill checkout info
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
  });

  it('Finish the checkout process', () => {
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.contains('Thank you for your order').should('be.visible');
  });
});
