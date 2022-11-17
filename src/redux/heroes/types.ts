export type HeroType = {
  id: string;
  name: string;
  description: string;
  element: string;
};

export interface IHeroesSliceState {
  heroes: HeroType[];
  heroesLoadingStatus: Status;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
