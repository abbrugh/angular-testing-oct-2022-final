import { SongsSelectors } from './app-songs.selectors';

describe('The Songs List', () => {
  describe('No Songs Returned From The Api', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:1337/songs/', {
        body: {
          data: [],
        },
      });
      cy.visit('/songs/list');
    });
    it('Should Tell You That You Have No Songs', () => {
      SongsSelectors.getSongsListItems().should('have.length', 0);
      SongsSelectors.getSongsListComponent()
        .find('[data-testid="no-songs-alert"]')
        .should('exist');
    });
  });
  describe('The Happy Path - Two Songs, API Ok', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:1337/songs/', {
        fixture: 'songs-two-songs-happy.json',
        delay: 10,
      }).as('slowList');
      cy.visit('/songs/list');
    });
    describe('The Initial State', () => {
      it('should display the list component', () => {
        SongsSelectors.getSongsList().should('exist');
      });
    });

    describe('Data Scenarios', () => {
      describe('Happy Path', () => {
        describe('Songs are Displayed Properly', () => {
          it('displays two songs', () => {
            SongsSelectors.getSongsListItems().should('have.length', 2);
          });

          it('first song should have an album', () => {
            // TODO: Your Homework. cy.wait('@slowList');
            SongsSelectors.getSongListItem('0')
              .find('[data-testid="album"]')
              .should('have.text', 'Some Album');
          });

          it('second song should have no album', () => {
            SongsSelectors.getSongListItem('1')
              .find('[data-testid="album"]')
              .should('have.text', 'No Album Recorded');
          });

          it('Should not display the alert', () => {
            SongsSelectors.getSongsListComponent()
              .find('[data-testid="no-songs-alert"]')
              .should('not.exist');
          });
        });
      });
    });
  });
});
