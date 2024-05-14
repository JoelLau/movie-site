import { Movies } from './movies.models';

export class Replace {
  static readonly type = '[Movies] Replace';
  constructor(public newMovieList: Movies) {}
}
