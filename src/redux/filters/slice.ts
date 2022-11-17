import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchFilters } from "./asyncAction";
import { FilterType, IFiltersSliceState } from "./types";
import { Status } from "../heroes/types";

const initialState: IFiltersSliceState = {
  filters: [],
  filtersLoadingStatus: Status.LOADING,
  activeFilter: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChange: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.filtersLoadingStatus = Status.LOADING;
    });
    builder.addCase(
      fetchFilters.fulfilled,
      (state, action: PayloadAction<FilterType[]>) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = Status.SUCCESS;
      }
    );
    builder.addCase(fetchFilters.rejected, (state) => {
      state.filtersLoadingStatus = Status.ERROR;
    });
  },
});

export const { activeFilterChange } = filtersSlice.actions;
export default filtersSlice.reducer;
