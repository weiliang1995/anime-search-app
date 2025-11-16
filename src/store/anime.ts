import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AnimeState, AnimeSearchResponse } from "./types";

const API_BASE_URL = "https://api.jikan.moe/v4";

const initialState: AnimeState = {
  searchTerm: '',
  results: [],
  pagination: null,
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
}

export const fetchAnimeBySearch = createAsyncThunk<
  { query: string,  response: AnimeSearchResponse },
  { query: string; page: number },
  { rejectValue: string, signal: AbortSignal }
>(
  'anime/fetchBySearch',
  async ({ query, page }, { signal, rejectWithValue }) => {
    try {
      const baseUrl = `${API_BASE_URL}/anime`;
      const url = query ? `${baseUrl}?q=${encodeURIComponent(query)}&page=${page}&limit=12&order_by=score&sort=desc` : `${API_BASE_URL}/top/anime?limit=12&page=${page}`;
      const response = await fetch(url, { signal });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data: AnimeSearchResponse = await response.json();
      return { query, response: data };
      
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
        if (action.payload.query.trim() !== state.searchTerm.trim()) return;
        state.loading = 'succeeded';
        state.results = action.payload.response.data;
        state.pagination = action.payload.response.pagination;
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