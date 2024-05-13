import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { INITIAL_STATE } from './movies-state.models';

@State<MoviesState>({
  name: 'movies',
  defaults: INITIAL_STATE,
})
@Injectable()
export class MoviesState {}
