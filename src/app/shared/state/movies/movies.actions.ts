import { Movies } from './movies-state.models';

export class SetList {
  static readonly type = '[Movies] Set List';
  constructor(public newMovies: Movies) {}
}
