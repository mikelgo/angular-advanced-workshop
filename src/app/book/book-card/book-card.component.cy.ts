import {BookCardComponent} from "./book-card.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MatCardModule} from "@angular/material/card";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('BookCardComponent', () => {
    beforeEach(() => {
        cy.mount(BookCardComponent, {
            declarations: [BookCardComponent],
            imports: [RouterTestingModule, MatCardModule, BrowserModule, BrowserAnimationsModule]
        })
    })

    it('should have title', () => {
        cy.get('[data-test="book-card-title"]').should('have.text', 'n/a')
    });
})
