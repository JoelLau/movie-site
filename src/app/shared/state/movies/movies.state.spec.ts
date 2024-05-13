import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MoviesState } from './movies.state';
import { INITIAL_STATE } from './movies-state.models';

describe(MoviesState.name, () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MoviesState], { developmentMode: true })],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  it('sanity check: initial state', () => {
    expect(store.selectSnapshot(MoviesState)).toEqual(INITIAL_STATE);
  });
});
