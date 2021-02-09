import { hot, cold } from 'jasmine-marbles';
import { from, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

function convertToUpperCase(inStream$: Observable<string>): Observable<string> {
  return inStream$.pipe(
    map((char: string ) => char.toUpperCase())
  );
}

describe('hot', () => {

  it('should test subscription on hot observable that completes', () => {
    // Arrange:
    const provided = hot('-a-^b---c-|');
    const subscription =    '^------!';

    // Assert:
    // asserting the Observable will subscribe automatically:
    expect(provided).toBeObservable(cold('-b---c-|'));
    expect(provided).toHaveSubscriptions(subscription);
  });

  it('should test subscription observable on hot observable that never completes', () => {
    // Arrange:
    const provided = hot('-a-^(bc)--');
    const subscription =    '^--';

    // Assert:
    expect(provided).toBeObservable(cold('-(bc)--'));
    expect(provided).toHaveSubscriptions(subscription);
  });

  it(`should convert alphabet to uppercase`, () => {
    // Arrange:
    const keyboardStream = hot('-^a--b--c--d--');
    const expected = cold('-A--B--C--D--');
    const subscription = '^--';

    // Act:
    const provided = convertToUpperCase(keyboardStream);

    // Assert:
    expect(provided).toBeObservable(expected);
    expect(keyboardStream).toHaveSubscriptions(subscription);
  });
});
