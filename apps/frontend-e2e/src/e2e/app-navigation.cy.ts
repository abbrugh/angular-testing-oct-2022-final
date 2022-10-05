describe('The Navigation Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('Initial State', () => {
    it('Using the Location', () => {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/home');
        expect(loc.href).to.eq('http://localhost:4200/home');
        expect(loc.port).to.eq('4200');
        // https://localhost:4200/home?country=USA
        // https: Scheme [http|https] (protocol)
        expect(loc.protocol).to.eq('http:');
      });
    });
    it('ensuring home is a catchall', () => {
      cy.visit('tacosaladrabbitnose');
      cy.url().should('match', /\/home$/);
    });
    it('Updates the location', () => {
      cy.url().should('match', /\/home$/); // at the end of the url ($), there should be a '/' (\/) followed by 'home'
    });
    it('Displays the Home Component', () => {
      cy.get('[data-testid="app-home"]').should('exist');
    });

    it('the home link has the active class', () => {
      cy.get('[data-testid="app-navigation"]')
        .find('[data-testid="link-home"]')
        .should('have.class', 'active');
    });
  });

  describe('The Counter Link', () => {
    it('should be navigable', () => {
      cy.get('[data-testid="app-navigation"]')
        .find('[data-testid="link-counter"]')
        .click()
        .url()
        .should('match', /\/counter$/);
    });
  });

  describe('The Songs Link', () => {
    it('should be navigable', () => {
      cy.get('[data-testid="app-navigation"]')
        .find('[data-testid="link-songs"]')
        .click()
        .url()
        .should('match', /\/songs$/);

      cy.get('[data-testid="songs"]').should('exist');
    });
  });
});
