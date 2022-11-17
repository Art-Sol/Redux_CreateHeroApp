import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { FilterType } from "./types";
import store from "../store";
import { useDispatch } from "react-redux";

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { data } = await axios.get<FilterType[]>(
      "https://63613cd267d3b7a0a6c1cb49.mockapi.io/filters"
    );
    return data;
  }
);

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
