import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TrackMoviePageVisit } from './user.actions';
import { INITIAL_STATE, STATE_NAME, UserStateModel } from './user.models';

@State<UserStateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE,
})
@Injectable()
export class UserState {
  @Selector()
  static movieVisitHistory({ movieVisitHistory }: UserStateModel) {
    return movieVisitHistory;
  }

  @Action(TrackMoviePageVisit)
  trackVisit(state: StateContext<UserStateModel>, action: TrackMoviePageVisit) {
    return state.setState({
      movieVisitHistory: [action.movie, ...state.getState().movieVisitHistory],
    });
  }
}
