export type FetchAllResponse = RawMovie[];

export interface RawMovie {
  id: string;
  slug: string;
  title: string;
  popularity: string;
}
