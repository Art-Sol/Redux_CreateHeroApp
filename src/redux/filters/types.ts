export type FilterType = {
  id: number;
  name: string;
  label: string;
  className: string;
};

export interface IFiltersSliceState {
  filters: FilterType[];
  filtersLoadingStatus: string;
  activeFilter: string;
}
