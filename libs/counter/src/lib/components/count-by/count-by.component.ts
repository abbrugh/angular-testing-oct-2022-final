import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCountingBy } from '../../state';
import { CountByEvents } from '../../state/actions/count-by.actions';
import { Options } from '../../state/reducers/counter.reducer';

@Component({
  selector: 'ht-count-by',
  templateUrl: './count-by.component.html',
  styleUrls: ['./count-by.component.css'],
})
export class CountByComponent {
  disable$ = this.store.select(selectCountingBy);

  constructor(private store: Store) {}

  changeDisabled(to: Options) {
    this.store.dispatch(CountByEvents.set({ payload: to }));
  }
}
