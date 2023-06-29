describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/books');

    cy.get('.books-grid').children().as('books');
  });

  it('passes', () => {
    cy.get('[data-testid="app-title"]').contains('BOOK');
  })

  it('should increase the number of books by 1', () => {

    let countBefore = 0;

      cy.get('@books')
        .then(books => (countBefore = books.length))
        .then(() => {
          const randomISBN = Math.floor(1000000000000 + Math.random() * 900000);

          cy.visit('http://localhost:4200/books/new');
          cy.get('[data-test="isbn-field"]').type(String(randomISBN));
          cy.get('[data-test="title-field"]').type('Lord of the rings');
          cy.get('[data-test="author-field"]').type('Max Mustermann');

          cy.get('[data-test="create-button"]').click();
        })

      cy.get('@books').then(books => {
          console.log("countBefore", countBefore);
          console.log("books.length", books.length);

          expect(books.length).to.eq(countBefore + 1);

      })
  })
})
