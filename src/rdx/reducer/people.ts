import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../api";
import { PeopleResponse } from "../../types/";

export const fetchPeople = createAsyncThunk("people/fetchData", () =>
  http("https://swapi.dev/api/people")
  .then((data) => data as PeopleResponse)
  .catch((e) => {
    throw Error("Fetch Error: " + e);
  })
);

type State = { loading: boolean; data: PeopleResponse | null; error: string };
const initialState: State = { loading: false, data: null, error: "" };

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPeople.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ? action.error.message : "";
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});
