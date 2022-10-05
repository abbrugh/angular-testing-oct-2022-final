import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { CountByEvents } from '../actions/count-by.actions';
import { CountDocuments, CountEvents } from '../actions/counter.actions';
export type Options = 'one' | 'three' | 'five';
export interface CountState {
  current: number;
  by: Options;
}

const initialState: CountState = {
  current: 0,
  by: 'one',
};

export const reducers = createReducer(
  initialState,
  on(CountDocuments.state, (_, a) => a.payload),

  on(CountByEvents.set, (s, a) => ({ ...s, by: a.payload })),
  on(CountEvents.increment, (s: CountState): CountState => {
    return {
      ...s,
      current: s.current + getIncrementor(s.by),
    };
  }),
  on(CountEvents.decrement, (s: CountState): CountState => {
    return {
      ...s,
      current: s.current - getIncrementor(s.by),
    };
  }),
);

function getIncrementor(by: Options): number {
  switch (by) {
    case 'one': {
      return 1;
    }
    case 'three': {
      return 3;
    }
    default: {
      return 5;
    }
  }
}
