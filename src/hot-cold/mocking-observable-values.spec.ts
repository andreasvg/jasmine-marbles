import { cold, hot } from "jasmine-marbles";
import { from, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

class Book {
  author: string;
  title: string;
  libraryID: number;
}

const library: Book[] = [
  {
    author: 'Bill Gates',
    title: 'Why I love Windows',
    libraryID: 1234
  },
  {
    author: 'Steve Jobs',
    title: 'Mac and Windows: Apples and Oranges',
    libraryID: 1235
  },
  {
    author: 'Mike Stern',
    title: 'Altered scale soloing',
    libraryID: 1236
  },
  {
    author: 'Mike Stern',
    title: 'Why I love jazz',
    libraryID: 1237
  }
];

function searchBooks(title$: Observable<string>): Observable<Book[]> {
  return title$.pipe(
    switchMap((searchTerm: string) =>
      of(library.filter(book => book.title.indexOf(searchTerm) > -1))
    )
  );
}

describe(`Can support Observable data mocking`, () => {

  it(`should return the expected books`, () => {
    // Arrange:
    const keyboardStream = hot('a--', {a: 'Why I love'});
    const expectedObservable = cold('a--', { a: [
      {
        author: 'Bill Gates',
        title: 'Why I love Windows',
        libraryID: 1234
      },
      {
        author: 'Mike Stern',
        title: 'Why I love jazz',
        libraryID: 1237
      }
    ]});

    // Act:
    const result = searchBooks(keyboardStream);

    // Assert:
    expect(result).toBeObservable(expectedObservable);
  });

});

const bookPrices = [14.99, 25, 8.75, 6.50, 23];

function sortArray(input$: Observable<number[]>): Observable<number[]> {
  return input$.pipe(
    map((items: number[]) => items.sort((a, b) => {
      return (a === b) ? 0 : a - b;
    }))
  );
}

describe(`sortArray`, () => {
  it(`should emit an array sorted in ascending sequence`, () => {
    // Arrange:
    const sortedArray = [6.50, 8.75, 14.99, 23, 25];
    const input$ = cold('-a-|', { a: [...bookPrices]});
    const expected = cold('-a-|)', { a: sortedArray });

    // Act:
    const result$ = sortArray(input$);

    // Assert:
    expect(result$).toBeObservable(expected);
  });
});

