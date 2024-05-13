import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { MoviesState } from './movies.state';
import { INITIAL_STATE, Movies } from './movies.models';
import { Refresh } from './movies.actions';
import { generateMockMovies } from '@test-helpers/movie-generator';
import { MoviesApiService } from '@services/movies-api.service';
import { FetchAllResponse } from '@services/movies-api.model';

describe(MoviesState.name, () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MoviesState], { developmentMode: true })],
      providers: [[...MockProviders(MoviesApiService)]],
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

  describe(`\`${Refresh.name}\` action`, () => {
    it('replaces `movieList`', () => {
      const mockRaws: FetchAllResponse = [
        { id: '', slug: '', title: '', popularity: '9.3' },
      ];
      const movieList: Movies = [{ id: '', slug: '', popularity: 9.3 }];

      const service = TestBed.inject(MoviesApiService);
      jest.spyOn(service, 'fetchAll').mockReturnValue(of(mockRaws));

      store.dispatch(new Refresh());
      expect(store.selectSnapshot((state) => state.movies?.movieList)).toEqual(
        movieList,
      );
    });
  });
});
