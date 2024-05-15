import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { RouterModule } from '@angular/router';
import { MoviesPageService } from './movies-page.service';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import { StoreModule } from '@shared/state/store.module';

describe(MoviesPageService.name, () => {
  let service: MoviesPageService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule, RouterModule.forRoot([])],
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
