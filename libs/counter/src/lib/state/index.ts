import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromCounter from './reducers/counter.reducer';

export const featureName = 'counter';

export interface CounterState {
  count: fromCounter.CountState;
}

export const reducers: ActionReducerMap<CounterState> = {
  count: fromCounter.reducers,
};

const selectFeature = createFeatureSelector<CounterState>(featureName);

export const selectCountBranch = createSelector(selectFeature, (f) => f.count);

export const selectCurrentCount = createSelector(
  selectCountBranch,
  (b) => b.current,
);

export const selectCountingBy = createSelector(selectCountBranch, (b) => b.by);
