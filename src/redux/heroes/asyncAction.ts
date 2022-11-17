import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { HeroType } from "./types";
import { useDispatch } from "react-redux";
import store from "../store";

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { data } = await axios.get<HeroType[]>(
    "https://63613cd267d3b7a0a6c1cb49.mockapi.io/heroes"
  );
  return data;
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
