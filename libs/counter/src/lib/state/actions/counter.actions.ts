import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CountState } from '../reducers/counter.reducer';

export const CountEvents = createActionGroup({
  source: 'counter count events',
  events: {
    increment: emptyProps(),
    decrement: emptyProps(),
  },
});

export const CountDocuments = createActionGroup({
  source: 'counter count documents',
  events: {
    state: props<{ payload: CountState }>(),
  },
});

export const FeatureEvents = createActionGroup({
  source: 'counter feature events',
  events: {
    entered: emptyProps(),
  },
});
