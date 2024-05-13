import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MoviesState } from './movies.state';
import { INITIAL_STATE, Movie } from './movies-state.models';
import { ReplaceAll } from './movies.actions';
import { generateMockMovies } from '@test-helpers/movie-generator';

describe(MoviesState.name, () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MoviesState], { developmentMode: true })],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  it('initialises', () => {
    expect(store.selectSnapshot(MoviesState)).toStrictEqual(INITIAL_STATE);
  });

  describe(`\`${MoviesState.all}\` selector`, () => {
    it('returns `movieList`', () => {
      const movieList = generateMockMovies(30);
      store.reset({
        ...store.snapshot(),
        movies: { movieList },
      });

      expect(store.selectSnapshot(MoviesState.all)).toBe(movieList);
    });
  });

  describe(`\`${ReplaceAll.name}\` action`, () => {
    it('replaces `movieList`', () => {
      expect(store.selectSnapshot(MoviesState)).toStrictEqual(INITIAL_STATE);

      const movieList = generateMockMovies(30);
      store.dispatch(new ReplaceAll(movieList));
      expect(store.selectSnapshot((state) => state.movies?.movieList)).toEqual(
        movieList,
      );
    });
  });
});
