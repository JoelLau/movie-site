import { Movie } from '../movies/movies.models';

export class TrackMoviePageVisit {
  static readonly type = '[User] Track Movie Page Visit';
  constructor(public movie: Movie) {}
}
