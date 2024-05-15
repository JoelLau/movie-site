import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MoviesService } from './movies.service';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import { MoviesState, NAME } from '@shared/state/movies/movies.state';
import { StoreModule } from '@shared/state/store.module';
import { MOCK_MOVIES } from '@tests/mock-movies.data';

describe(MoviesService.name, () => {
  let service: MoviesService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule],
      providers: [MockProvider(MoviesApiService)],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(MoviesService);
  });

  describe('fetchMovieList', () => {
    it('populates if store is empty', (done) => {
      const mockMovies = MOCK_MOVIES.slice(0, 20);
      const api = TestBed.inject(MoviesApiService);
      jest.spyOn(api, 'fetchAll').mockReturnValue(of(mockMovies));

      store.reset({
        ...store.snapshot(),
        [NAME]: undefined,
      });

      service.fetchMovieList().subscribe((response) => {
        const storeList = store.selectSnapshot(MoviesState.movies);
        expect(response).toStrictEqual(storeList);
        expect(response).toStrictEqual(mockMovies);

        done();
      });
    });
  });
});
