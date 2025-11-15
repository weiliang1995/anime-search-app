import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AnimeState, AnimeSearchResponse } from "./types";

const API_BASE_URL = "";

const initialState: AnimeState = {
  searchTerm: '',
  results: [],
  pagination: null,
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
}

export const fetchAnimeBySearch = createAsyncThunk<
  AnimeSearchResponse,
  { query: string; page: number },
  { rejectValue: string }
>(
  'anime/fetchBySearch',
  async ({ query, page }, { signal, rejectWithValue }) => {
    try {
      const url = `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20&sfw`;
      const response = await fetch(url, { signal });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data: AnimeSearchResponse = await response.json();
      return data;
      
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw rejectWithValue('Request cancelled');
      }
      return rejectWithValue((error as Error).message || 'An unknown error occurred.');
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeBySearch.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchAnimeBySearch.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.results = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAnimeBySearch.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.loading = 'idle'; 
          return;
        }
        state.loading = 'failed';
        state.error = action.payload as string || action.error.message || 'An unknown API error occurred.';
      });
  },
});

export const { setSearchTerm } = animeSlice.actions;
export default animeSlice.reducer;