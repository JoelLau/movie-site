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
});
