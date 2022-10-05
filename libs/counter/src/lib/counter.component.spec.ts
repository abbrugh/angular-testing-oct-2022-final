import { CounterComponent } from './counter.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromCounterReducer from '../lib/state/';
import { RouterModule } from '@angular/router';
import { CountEvents } from './state/actions/counter.actions';
describe('CounterComponent', () => {
  let spectator: Spectator<CounterComponent>;
  let store: MockStore;
  const initialState = {
    counter: {
      count: fromCounterReducer.reducers,
    },
  };
  const createComponent = createComponentFactory({
    component: CounterComponent,
    providers: [
      provideMockStore({
        initialState,
        selectors: [
          {
            selector: fromCounterReducer.selectCurrentCount,
            value: 99,
          },
        ],
      }),
    ],
    imports: [RouterModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject(MockStore);
    spectator.detectChanges();
  });
  it('initial state', () => {
    const component = spectator.query('[data-testid="counter-play"]');
    expect(component).toMatchSnapshot();
  });
  it('can increment', () => {
    const incrementButton = spectator.query('[data-testid="increment"]');
    if (!incrementButton) {
      fail('Selector for increment button is bad.');
    } else {
      jest.spyOn(store, 'dispatch');
      spectator.click(incrementButton);
      expect(store.dispatch).toHaveBeenCalledWith(CountEvents.increment());
    }
  });
});
