export interface Movie {
  id: string;
  title: string;
  popularity: string;
  image: {
    url: string;
    title: string;
  };
  slug: string;
  runtime: string;
  released: string;
  genres: string[];
  budget: number | null;
}
