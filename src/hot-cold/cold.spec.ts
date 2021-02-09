import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, Observable, throwError, from, EMPTY } from 'rxjs';

const alphabet = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

function search(val: string): Observable<string> {
  return alphabet.indexOf(val) > -1 ? of(`${val}`) : EMPTY;
}

describe('COLD', () => {
  it(`can search an alphabet`, () => {
    // Arrange:
    const expected = cold('(e|)');

    // Act:
    const provided = search('e');

    // Assert:
    expect(provided).toBeObservable(expected);
  });

  it(`can return EMPTY when no value found`, () => {
    // Arrange:
    const expected = cold('|');

    // Act:
    const provided = search('1');

    // Assert:
    expect(provided).toBeObservable(expected);
  });

  it('of with one value', () => {

  });

  it('of with 2 values', () => {

  });

  it('from', () => {

  });

  it('should trim the spaces', () => {
  });
});
