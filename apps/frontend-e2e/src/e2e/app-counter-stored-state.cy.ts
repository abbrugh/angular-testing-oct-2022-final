import po from './counter-count-by.selectors';
import poCounter from './counter.selectors';
describe('The Counter Saves Its State', () => {
  describe('initial state', () => {
    it('displays defaults if no data is stored', () => {
      cy.visit('/counter/by');
      po.getOne().should('be.disabled');
      poCounter.getCurrent().should('have.text', '0');
    });
  });

  describe('refreshing the page', () => {
    it('remembers what you had if you refresh', () => {
      cy.visit('/counter/by');
      po.getThree().click();
      poCounter.getIncrement().click().click();
      cy.visit('/counter/by');
      po.getThree().should('be.disabled');
      poCounter.getCurrent().should('have.text', 6);
    });
  });
  afterEach(() => {
    cy.clearLocalStorage();
  });
});
