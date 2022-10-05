describe('frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('The Header Is Set', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.get('[data-testid="app-mastheader-title"]').contains(
      'Angular Developer Testing Course',
    );
    cy.get('[data-testid="app-mastehead-subtitle"]').contains(
      'Training to be Boss Angular Developers and Testers',
    );
  });
});
