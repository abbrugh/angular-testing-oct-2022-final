import { map, Observable, Observer, of, tap } from 'rxjs';

describe('basic structure for testing a method or function that returns an observable', () => {
  it('testing the sendToServer', (done) => {
    //let observer: Observer;

    // We can't say we are done until the sendToServer returns a value.
    // if we take the 'done' callback on the function for the "it", it won't let the test complete until we call that function.
    // There is a configurable timeout.. I can't remember what the default is, but in a unit test, it should be plenty.
    sendToServer({ message: 'Lunch Time', priority: 'HIGH' })
      .pipe(map((response) => response.toUpperCase()))
      .subscribe({
        next: (val) => {
          expect(val).toBe('DONE!');
        },
        complete: () => done(),
      });
  });
});

function sendToServer(log: {
  message: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}): Observable<string> {
  // do the thing...
  return of('Done!');
}
