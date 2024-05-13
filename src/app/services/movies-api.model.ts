export type FetchAllResponse = RawMovie[];

export interface RawMovie {
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
  budget: number;
}
