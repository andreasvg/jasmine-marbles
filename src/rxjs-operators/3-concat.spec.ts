import { hot, cold } from 'jasmine-marbles';
import { concat } from 'rxjs';
//import { concat } from 'rxjs/operators';

describe('concat', () => {
  it('should concat cold observables', () => {});

  describe('should identify subscription points in cold observable', () => {
    let obs1, sub1, obs2, sub2, expected, result;
    beforeEach(() => {
      obs1 = cold('    ---a---b|');
      sub1 = '         ^-------!';
      obs2 = cold('             ---c---d|');
      sub2 = '         --------^--------!';
      expected = cold('---a---b---c---d|');
      //result = obs1.pipe(concat(obs2));
      result = concat(obs1, obs2);
    });

    it('should match result', () => {
      expect(result).toBeObservable(expected);
    });

    it('should identify first subscription', () => {
      expect(result).toBeObservable(expected);

      //expect(obs1).toHaveSubscriptions(obs1);
    });

    it('should identify 2nd subscription', () => {});

    it(`observables should have expected subscriptions`, () => {
      // Arrange:
      obs1 = cold(    '---a---b|');
      sub1 =          '^-------!';
      obs2 = cold('             ---c---d|');
      sub2 =           '--------^-------!';
      expected = cold('---a---b---c---d|');

      // Act:
      result = concat(obs1, obs2);

      // Assert:
      expect(result).toBeObservable(expected);
      expect(obs1).toHaveSubscriptions(sub1);
      expect(obs2).toHaveSubscriptions(sub2);
    });
  });

  it('should concat hot observables', () => {});
});
