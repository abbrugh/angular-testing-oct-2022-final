import { createActionGroup, emptyProps } from '@ngrx/store';

export const PlaylistFeatureEvents = createActionGroup({
  source: 'songs feature Events',
  events: {
    entered: emptyProps(),
  },
});
