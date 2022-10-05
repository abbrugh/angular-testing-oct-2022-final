import { createActionGroup, props } from '@ngrx/store';
import { Options } from '../reducers/counter.reducer';

export const CountByEvents = createActionGroup({
  source: 'counter count-by events',
  events: {
    set: props<{ payload: Options }>(),
  },
});
