import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchHeroes } from "./asyncAction";
import { HeroType, IHeroesSliceState, Status } from "./types";

const initialState: IHeroesSliceState = {
  heroes: [],
  heroesLoadingStatus: Status.LOADING,
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroCreate: (state, action: PayloadAction<HeroType>) => {
      state.heroes.push(action.payload);
    },
    heroDelete: (state, action: PayloadAction<string>) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHeroes.pending, (state) => {
      state.heroesLoadingStatus = Status.LOADING;
    });
    builder.addCase(
      fetchHeroes.fulfilled,
      (state, action: PayloadAction<HeroType[]>) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = Status.SUCCESS;
      }
    );
    builder.addCase(fetchHeroes.rejected, (state) => {
      state.heroesLoadingStatus = Status.ERROR;
    });
  },
});

export const { heroCreate, heroDelete } = heroesSlice.actions;
export default heroesSlice.reducer;
