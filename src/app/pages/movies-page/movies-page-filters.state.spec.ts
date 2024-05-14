import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MockProviders } from 'ng-mocks';
import {
  MoviesPageFilters,
  MoviesPageFiltersState,
  NAME,
} from './movies-page-filters.state';
import { MoviesApiService } from '@services/movies-api/movies-api.service';

describe(MoviesPageFiltersState.name, () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([MoviesPageFiltersState], { developmentMode: true }),
      ],
      providers: [[...MockProviders(MoviesApiService)]],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  describe(`\`${MoviesPageFiltersState.filters}\` selector`, () => {
    it('returns `filters`', () => {
      const mockFilters: MoviesPageFilters = {
        searchTerms: 'Lord of the Rings',
        genres: [],
      };

      store.reset({
        ...store.snapshot(),
        [NAME]: mockFilters,
      });

      expect(store.selectSnapshot(MoviesPageFiltersState.filters)).toBe(
        mockFilters,
      );
    });
  });
});
