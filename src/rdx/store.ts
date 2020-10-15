import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { peopleSlice } from "./reducer/people";

const reducer = combineReducers({
  people: peopleSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type PeopleState = ReturnType<typeof reducer>;
