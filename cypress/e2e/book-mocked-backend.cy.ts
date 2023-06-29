describe('books with mocked backend spec', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:4730/books',  {
            statusCode: 200,
            fixture:'books'
        });
    });

    it('passes', () => {
        cy.visit('http://localhost:4200/books')
    })
})
