import { SongsSelectors } from './app-songs.selectors';
const selectors = {
  component: () => cy.get('[data-testid="entry"]'),
};
describe('Adding a new Song To Your List', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:1337/songs/', {
      body: {
        data: [],
      },
    });
    cy.visit('/songs/new');
  });

  describe('Initial State', () => {
    it('Displays the Entry Components', () => {
      selectors.component().should('exist');
    });
    it('title should have focus', () => {
      // selectors.component().find('[data-testid="title"]').should('have.focus');
    });
  });
  describe('The Happy Path', () => {
    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:1337/songs/', (req) => {
        req.reply({
          statusCode: 201,
          delay: 10,
          body: {
            id: '99',
            ...req.body,
          },
        });
      }).as('addSong');
    });

    it('adding a song following the rules', () => {
      selectors.component().find('[data-testid="title"]').type('Song #1');
      selectors.component().find('[data-testid="artist"]').type('Fugazi');
      selectors
        .component()
        .find('[data-testid="album"]')
        .type('Repeater {enter}');
      // and/or find the submit button and click it.
      selectors
        .component()
        .find('[data-testid="title"]')
        .should('have.value', '')
        .should('have.focus');

      cy.wait('@addSong').then(() => {
        cy.get('[data-testid="song-list-link"]').click();
        // make sure the song is the first one in the list.
        SongsSelectors.getSongListItem('0')
          .find('[data-testid="title"]')
          .should('have.text', 'Song #1');
      });
    });
  });

  describe('Form Validation Rules', () => {
    beforeEach(() => {
      cy.visit('/songs/new');
    });
    describe('The Title', () => {
      it('Is Required', () => {
        cy.get('[data-testid="title"]').focus();
        cy.get('[data-testid="artist"]').focus();
        cy.get('[data-testid="title-validation"]')
          .should('exist')
          .should('contain.text', 'This is Required');

        cy.get('[data-testid="title"]').type('xx');
        cy.get('[data-testid="artist"]').focus();
        cy.get('[data-testid="title-validation"]')
          .should('exist')
          .should(
            'contain.text',
            'You must have at least 3 letters in the title',
          );
      });
    });
  });

  describe('Api Errors', () => {
    beforeEach(() => {
      cy.visit('/songs/new');
      cy.intercept('POST', 'http://localhost:1337/songs/', (req) => {
        req.reply({
          statusCode: 400,
          delay: 10,
          body: {},
        });
      }).as('addSongError');
    });

    it('avacado', () => {
      selectors.component().find('[data-testid="title"]').type('Song #1');
      selectors.component().find('[data-testid="artist"]').type('Fugazi');
      selectors
        .component()
        .find('[data-testid="album"]')
        .type('Repeater {enter}');

      cy.wait('@addSongError');
      // and then what!?
    });
  });
});
