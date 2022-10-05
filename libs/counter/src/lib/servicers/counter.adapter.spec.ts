import { CountState } from '../state/reducers/counter.reducer';
import { CounterAdapter, CounterReadResult } from './counter.adapter';
describe('CounterAdapter', () => {
  describe('Storing Values', () => {
    it('Allows You To Store the Counter State', (done) => {
      const fakeStorage: Record<string, string> = {};

      const mockStorage = (global.Storage.prototype.setItem = jest.fn(
        (key, value) => {
          fakeStorage[key] = value;
        },
      ));

      const service = new CounterAdapter();
      const stateToSave: CountState = {
        current: 99,
        by: 'five',
      };
      service.saveState(stateToSave).subscribe({
        complete: () => {
          const json = JSON.stringify(stateToSave);
          expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
            'counter',
            json,
          );
          expect(fakeStorage['counter']).toEqual(json);
          mockStorage.mockReset(); // go back to using the normal localstorage.
          done();
        },
      });
    });
  });

  describe('Reading Values)', () => {
    // Reading the value when there is actually something stored.
    it('Returns the Stored Value', (done) => {
      const state: CountState = {
        current: 42,
        by: 'three',
      };
      const fakeStorage: Record<string, string> = {
        counter: JSON.stringify(state),
      };

      const mockStorage = (global.Storage.prototype.getItem = jest.fn(
        (key) => fakeStorage[key],
      ));

      const service = new CounterAdapter();

      service.readState().subscribe({
        next: (result: CounterReadResult) => {
          if (result.status === 'OK') {
            expect(result.value).toEqual(state);
          } else {
            fail('Expected an OK result');
          }
          mockStorage.mockClear();
          done();
        },
      });
    });
    // Reading the value when there isn't something stored.
    it('No Data Stored', (done) => {
      const fakeStorage: Record<string, string> = {};

      const mockStorage = (global.Storage.prototype.getItem = jest.fn(
        (key) => fakeStorage[key],
      ));

      const service = new CounterAdapter();

      service.readState().subscribe({
        next: (result: CounterReadResult) => {
          if (result.status === 'ERROR') {
            expect(result.message).toEqual('No Data Stored');
          } else {
            fail('Expected an ErrorResult result');
          }
          mockStorage.mockClear();
          done();
        },
      });
    });
    // Reading the value, but the value stored is bad.
  });
});
