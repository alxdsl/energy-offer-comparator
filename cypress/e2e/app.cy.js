describe('Navigation', () => {
  it('should navigate to the italian page', () => {
    // Start from the france page
    cy.visit('http://localhost:3000/france')

    // Find a link with an href attribute containing "italy" and click it
    cy.get('a[href*="italy"]').click()

    // The new url should include "/italy"
    cy.url().should('include', '/italy')

    // The new page should contain an h1 with "italy"
    cy.get('h1').contains('italy')
  })
})

describe('Filtering', () => {
  it('should filter offers', () => {
    // Start from the france page
    cy.visit('http://localhost:3000/france')

    // Find the first filter and click it
    let forValue = '';
    cy.get('label')
      .invoke('attr', 'for')
      .then((value) => {
        forValue = value;
      })
    cy.get('label').first().click()

    // The url should include the filter value
    cy.url().should('include', forValue);
  })
})

describe('Toggling', () => {
  it('should toggle pricing mode', () => {
    // Start from the france page
    cy.visit('http://localhost:3000/france')

    // Default pricing mode should be "monthly"
    cy.url().should('include', 'monthly');

    // Monthly pricing should be visible
    cy.get('article').get('output').contains('€/month');

    // Click the toggle button to switch to yearly pricing
    cy.get('[for="price_toggle_yearly"]').click();

    // The url should include "yearly"
    cy.url().should('include', 'yearly');

    // Yearly pricing should be visible
    cy.get('article').get('output').contains('€/year');
  })
})
