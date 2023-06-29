describe('template spec', () => {
  it('passes', () => {
    // Open
    cy.visit('http://localhost:4200/books');

// Query
    cy.get('[data-testid="app-title"]').contains('BOOK');
  })
})
