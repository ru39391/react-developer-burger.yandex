import {
  API_URL,
  LOGIN_URL,
  LOGOUT_URL,
  PROFILE_URL,
  AUTH_ALIAS,
  ORDERS_ALIAS,
  INGREDIENTS_URL,
  TEST_USER_EMAIL,
  TEST_USER_PWD
} from '../../../src/utils/constants';

describe('checkout', () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.intercept(`${API_URL}${ORDERS_ALIAS}`).as('ordersInterception');
    cy.intercept(`${API_URL}${INGREDIENTS_URL}`).as('productsInterception');
    cy.intercept(`${API_URL}${AUTH_ALIAS}/${LOGIN_URL}`).as('loginInterception');
    cy.intercept(`${API_URL}${AUTH_ALIAS}/${LOGOUT_URL}`).as('logoutInterception');
    cy.get(`[data-ref="${PROFILE_URL}-link"]`).as('profileLink');
    cy.get('[data-ref="constructor"]').as('constructor');
    cy.get('[data-ref="card"]').as('cards');
  });

  after(() => {
    cy.get('@profileLink').click();

    cy.url().should('include', PROFILE_URL)
      .then(() => {
        cy.get('[data-ref="logout-btn"]').as('logoutBtn');
        cy.get('@logoutBtn').click();
      })
      .then(() => {
        cy.url().should('eq', Cypress.config().baseUrl);
      });

    cy.wait('@logoutInterception')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.log('This test was completed successfully');
      });
  });

  it('should be checkout', () => {
    const dataTransfer = new DataTransfer();

    cy.wait('@productsInterception')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.get('@cards').each((card) => {
          cy.get(card).trigger('dragstart', { dataTransfer });
          cy.get('@constructor').trigger('drop', { dataTransfer });
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(500);
        })
      })
      .then(() => {
        cy.get('[data-ref="checkout-btn"]').as('checkoutBtn');
        cy.get('@checkoutBtn').click();
      });

    cy.url().should('include', LOGIN_URL)
      .then(() => {
        cy.get('[data-ref="email-input"]').as('emailInput');
        cy.get('@emailInput').type(TEST_USER_EMAIL);

        cy.get('[data-ref="password-input"]').as('passwordInput');
        cy.get('@passwordInput').type(TEST_USER_PWD);
      })
      .then(() => {
        cy.get('[data-ref="submit-btn"]').as('submitBtn');
        cy.get('@submitBtn').click();
      });

    cy.wait('@loginInterception')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.url().should('eq', Cypress.config().baseUrl)
          .then(() => {
            cy.get('@checkoutBtn').click();
          });
      });

    cy.wait('@ordersInterception')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.get('body').type('{esc}');
      });
  });
});
