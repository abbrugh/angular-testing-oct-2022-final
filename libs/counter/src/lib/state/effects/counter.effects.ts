import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { selectCountBranch } from '..';
import { CounterAdapter } from '../../servicers/counter.adapter';
import { CountByEvents } from '../actions/count-by.actions';
import {
  CountDocuments,
  CountEvents,
  FeatureEvents,
} from '../actions/counter.actions';

@Injectable()
export class CounterEffects {
  readData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.entered),
      switchMap(() =>
        this.counterAdapter.readState().pipe(
          filter((r) => r.status === 'OK'),
          map((response) => {
            if (response.status === 'OK') {
              return CountDocuments.state({ payload: response.value });
            } else {
              return { type: 'BLAMMO' }; // TODO.
            }
          }),
        ),
      ),
    );
  });
  saveCountState$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CountByEvents.set, CountEvents.decrement, CountEvents.increment),
        concatLatestFrom(() => this.store.select(selectCountBranch)),
        map(
          ([
            _,
            state,
          ]) => state,
        ),
        switchMap((state) => this.counterAdapter.saveState(state)),
      );
    },
    { dispatch: false },
  );

  constructor(
    private counterAdapter: CounterAdapter,
    private actions$: Actions,
    private store: Store,
  ) {}
}
