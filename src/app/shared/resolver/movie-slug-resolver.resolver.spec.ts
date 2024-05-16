import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { movieSlugResolverResolver } from './movie-slug-resolver.resolver';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { MoviesState, NAME } from '@shared/state/movies/movies.state';
import { Optional } from '@shared/type-helpers';

describe(movieSlugResolverResolver.name, () => {
  const executeResolver: ResolveFn<Optional<Movie>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      movieSlugResolverResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        NgxsModule.forRoot([MoviesState], { developmentMode: true }),
      ],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('return movie if slug exists', fakeAsync(() => {
    const store = TestBed.inject(Store);
    const mockMovie: Movie = {
      id: 'tt0111161',
      title: 'The Shawshank Redemption',
      popularity: '9.3',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        title: 'The Shawshank Redemption',
      },
      slug: 'the-shawshank-redemption',
      runtime: '142 min',
      released: '14 Oct 1994',
      genres: ['Drama'],
      budget: 28767189,
    };
    const mockMovies: Movies = [mockMovie];
    store.reset({
      ...store.snapshot(),
      [NAME]: mockMovies,
    });

    const route = {
      params: { slug: 'the-shawshank-redemption' },
    } as unknown as ActivatedRouteSnapshot;

    const resolver: Observable<Optional<Movies>> =
      TestBed.runInInjectionContext(() =>
        movieSlugResolverResolver(route, {} as RouterStateSnapshot),
      ) as Observable<Optional<Movies>>;

    resolver.subscribe((movies) => {
      expect(movies).toEqual(mockMovie);
    });

    tick();
  }));

  it("return falsy value if slug doesn't exists", fakeAsync(() => {
    const store = TestBed.inject(Store);
    const mockMovies: Movies = [];
    store.reset({
      ...store.snapshot(),
      [NAME]: mockMovies,
    });

    const route = {
      params: { slug: 'the-shawshank-redemption' },
    } as unknown as ActivatedRouteSnapshot;

    const resolver: Observable<Optional<Movies>> =
      TestBed.runInInjectionContext(() =>
        movieSlugResolverResolver(route, {} as RouterStateSnapshot),
      ) as Observable<Optional<Movies>>;

    resolver.subscribe((movies) => {
      expect(movies).toBeFalsy();
    });

    tick();
  }));
});
