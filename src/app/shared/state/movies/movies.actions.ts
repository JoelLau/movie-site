import { Movies } from './movies-state.models';

export class ReplaceAll {
  static readonly type = '[Movies] Set List';
  constructor(public newMovies: Movies) {}
}
