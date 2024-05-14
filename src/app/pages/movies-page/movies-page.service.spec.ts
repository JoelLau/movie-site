import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MoviesPageService } from './movies-page.service';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import {
  NAME as MOVIESSTATE_NAME,
  MoviesState,
} from '@shared/state/movies/movies.state';
import { StoreModule } from '@shared/state/store.module';
import { MOCK_MOVIES } from '@tests/mock-movies.data';

describe(MoviesPageService.name, () => {
  let service: MoviesPageService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule],
      providers: [MockProvider(MoviesApiService)],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(MoviesPageService);
  });

  it('sanity', () => {
    expect(true).toBe(true);
  });

  // describe('fetchFilteredMovies', () => {
  //   it('populates if store is empty', (done) => {
  //     const mockMovies = MOCK_MOVIES.slice(0, 20);
  //     const api = TestBed.inject(MoviesApiService);
  //     jest.spyOn(api, 'fetchAll').mockReturnValue(of(mockMovies));

  //     store.reset({
  //       ...store.snapshot(),
  //       [MOVIESSTATE_NAME]: undefined,
  //     });

  //     service
  //       .fetchFilteredMovies({ searchTerms: '', genres: [] })
  //       .subscribe((response) => {
  //         expect(response).toStrictEqual(mockMovies);

  //         done();
  //       });
  //   });
  // });
});
