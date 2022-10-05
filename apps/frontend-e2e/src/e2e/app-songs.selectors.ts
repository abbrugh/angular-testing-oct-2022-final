const selectFeature = '[data-testid="songs"]';
const selectListComponent = '[data-testid="list"]';
const selectListItems = '[data-testid="list-items"]';
export class SongsSelectors {
  /** Gives you the feature */
  static getSongsFeature() {
    return cy.get(selectFeature);
  }
  /** Give you the component */
  static getSongsListComponent() {
    return SongsSelectors.getSongsFeature().find(selectListComponent);
  }
  /** gives you the list within the songs list component */
  static getSongsList() {
    return SongsSelectors.getSongsListComponent().find(selectListItems);
  }
  static getSongsListItems() {
    return SongsSelectors.getSongsList().find('li');
  }
  static getSongListItem(id: string) {
    return SongsSelectors.getSongsList().find(
      `[data-testid="list-items-${id}"]`,
    );
  }
}
