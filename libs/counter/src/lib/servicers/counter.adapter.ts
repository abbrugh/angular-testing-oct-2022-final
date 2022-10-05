import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountState } from '../state/reducers/counter.reducer';

export class CounterAdapter {
  constructor(private key: string = 'counter') {}
  saveState(state: CountState): Observable<void> {
    const json = JSON.stringify(state);
    localStorage.setItem(this.key, json);
    return of();
  }

  readState(): Observable<CounterReadResult> {
    // what if it isn't stored? null
    const json = localStorage.getItem(this.key); // null | string
    if (!json) {
      return of({ status: 'ERROR', message: 'No Data Stored' });
    } else {
      let state: CountState;
      try {
        state = JSON.parse(json);
        return of({ status: 'OK', value: state });
      } catch {
        return of({ status: 'ERROR', message: 'Corrupt Data' });
      }
    }
  }
}

export type CounterReadResult = SuccessResult<CountState> | ErrorResult;

type SuccessResult<T> = {
  status: 'OK';
  value: T;
};

type ErrorResult = {
  status: 'ERROR';
  message?: string;
};

// export class ApiCounterAdapter implements CounterAdapter {
//   saveState(state: CountState): Observable<void> {
//     throw new Error('Method not implemented.');
//   }
//   readState(): Observable<CounterReadResult> {
//     throw new Error('Method not implemented.');
//   }
// }
