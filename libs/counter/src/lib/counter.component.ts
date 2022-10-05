import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentCount } from './state';
import { CountEvents, FeatureEvents } from './state/actions/counter.actions';

@Component({
  selector: 'ht-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  current$ = this.store.select(selectCurrentCount);

  constructor(private store: Store) {
    store.dispatch(FeatureEvents.entered());
  }
  increment() {
    this.store.dispatch(CountEvents.increment());
  }

  decrement() {
    this.store.dispatch(CountEvents.decrement());
  }
}
