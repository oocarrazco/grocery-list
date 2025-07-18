/// <reference types="cypress" />

describe('Grocery List App - Login', () => {
  const username = 'admin';
  const password = 'admin';

  it('logs in and shows dashboard', () => {
    cy.intercept('POST', 'http://localhost:5003/api/Auth/login').as('login');

    cy.visit('/');

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.contains('Login').click();

    cy.wait('@login').its('response.statusCode').should('eq', 200);

    cy.contains('Dashboard').should('be.visible');
  });
}); 