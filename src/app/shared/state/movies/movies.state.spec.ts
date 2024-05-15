import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MockProviders } from 'ng-mocks';
import { MovieStateModel, Movies } from './movies.models';
import { MoviesState, NAME } from './movies.state';
import { MOCK_MOVIES } from '@tests/mock-movies.data';
import { MoviesApiService } from '@services/movies-api/movies-api.service';

describe(MoviesState.name, () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([MoviesState], {
          developmentMode: true,
        }),
      ],
      providers: [[...MockProviders(MoviesApiService)]],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  it('initialises', () => {
    expect(store.selectSnapshot(MoviesState)).toStrictEqual({});
  });

  describe(`\`${MoviesState.movies}\` selector`, () => {
    it('returns `movies`', () => {
      const movies: MovieStateModel = MOCK_MOVIES.slice();
      store.reset({
        ...store.snapshot(),
        [NAME]: movies,
      });

      expect(store.selectSnapshot(MoviesState.movies)).toEqual(movies);
    });
  });

  describe(`\`${MoviesState.reduceMovieFn}\` selector`, () => {
    it('filters applied`', () => {
      const movies: MovieStateModel = MOCK_MOVIES;
      store.reset({
        ...store.snapshot(),
        [NAME]: movies,
      });

      const reduceFn = store.selectSnapshot(MoviesState.reduceMovieFn<Movies>);
      expect(
        reduceFn((prev) => {
          return prev;
        }, []),
      ).toEqual([]);
    });
  });
});
