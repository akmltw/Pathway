import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config';

export const createShortLink = createAsyncThunk(
  'links/createShortLink',
  async (url) => {
    const response = await fetch(API_BASE_URL + encodeURIComponent(url), {method: 'GET'});
    const data = await response.json();
    return { original_link: url, shorturl: data.shorturl };
  }
);

const initialState = {
  items: [],
  loading: 'idle',
};

const linkSlice = createSlice({
  name: 'links',
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createShortLink.rejected, (state) => {
      state.loading = 'rejected';
    })
    .addCase(createShortLink.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(createShortLink.fulfilled, (state, action) => {
      const {shorturl} = action.payload;

      if (shorturl) {
          state.items.push(action.payload);
          state.loading = 'idle';
      } else {
          state.loading = 'error';
      }
    });
  },
});


export const selectLoading = state => state.links.loading;
export const selectLinks = state => state.links.items;
export default linkSlice.reducer;