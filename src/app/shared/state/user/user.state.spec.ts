import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from './user.state';
import { TrackMoviePageVisit } from './user.actions';
import { STATE_NAME, UserStateModel } from './user.models';
import { MOCK_MOVIES } from '@tests/mock-movies.data';

describe(UserState.name, () => {
  let store: Store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {
          developmentMode: true,
        }),
      ],
    });

    store = TestBed.inject(Store);
  });

  it('initialises', () => {
    expect(store).toBeTruthy();
  });

  describe('visits', () => {
    it('store duplicates', () => {
      const initialState: UserStateModel = { movieVisitHistory: [] };
      store.reset({
        ...store.snapshot(),
        [STATE_NAME]: initialState,
      });

      const movie = MOCK_MOVIES[0];
      store.dispatch(new TrackMoviePageVisit(movie));
      store.dispatch(new TrackMoviePageVisit(movie));
      store.dispatch(new TrackMoviePageVisit(movie));
      expect(store.selectSnapshot(UserState.movieVisitHistory)).toEqual([
        movie,
        movie,
        movie,
      ]);
    });

    it('last visited first', () => {
      const first = MOCK_MOVIES[0];
      const second = MOCK_MOVIES[1];

      store.dispatch(new TrackMoviePageVisit(first));
      store.dispatch(new TrackMoviePageVisit(second));
      store.dispatch(new TrackMoviePageVisit(second));
      store.dispatch(new TrackMoviePageVisit(first));

      expect(store.selectSnapshot(UserState.movieVisitHistory)).toEqual([
        first,
        second,
        second,
        first,
      ]);
    });
  });
});
