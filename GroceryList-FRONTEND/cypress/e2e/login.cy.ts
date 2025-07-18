/// <reference types="cypress" />

describe('Grocery List App - Login', () => {
  const username = 'admin';
  const password = 'admin';

  it('logs in and shows grocery lists', () => {
    // Stub the login request so the test does not depend on a live backend.
    cy.intercept('POST', 'http://localhost:5003/api/Auth/login', {
      statusCode: 200,
      body: { userId: 1, message: 'Login successful' }
    }).as('login');

    cy.visit('/');

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.contains('Login').click();

    cy.wait('@login');

    // After successful login the Grocery Lists panel should be visible
    cy.contains('Grocery Lists').should('be.visible');
  });
}); 