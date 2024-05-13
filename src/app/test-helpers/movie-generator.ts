import { Movie, Movies } from '@shared/state/movies/movies.models';

export function generateMockMovies(num: number): Movies {
  return Array(num).map(() => {
    return generateMockMovie();
  });
}

export function generateMockMovie(): Movie {
  return {
    id: generateString(),
    slug: generateString(),
    popularity: generateFloat(0, 10),
  };
}

function generateString(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

function generateFloat(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
