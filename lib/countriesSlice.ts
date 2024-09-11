import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '@/actions/userActions';
// Define TypeScript interfaces for better type safety
interface Parent {
  id: string;
  name: string;
  parent: Parent | null;
}

interface Country {
  id: string;
  name: string;
  parent: Parent;
}

interface CountryState {
  countriesByRegion: {
    [key: string]: Array<{ id: string; name: string }>;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchCountries:any = createAsyncThunk(
  'countries/fetchCountries',
  async ({  token }: {token: string }) => {
    const response = await axios.get(`/api/countries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);
const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countriesByRegion: {} as { [key: string]: Array<{ id: string; name: string }> },
    status: 'idle',
    error: null as string | null,
  } as CountryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const data: Country[] = action.payload;

        // Group countries by their parent region
        const groupedCountries = data.reduce((acc: { [key: string]: Array<{ id: string; name: string }> }, country) => {
          const regionName = country.parent?.name || 'Unknown'; // Handle countries with no parent
          if (!acc[regionName]) {
            acc[regionName] = [];
          }
          acc[regionName].push({
            id: country.id,
            name: country.name,
          });
          return acc;
        }, {});

        state.countriesByRegion = groupedCountries;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
       .addCase(logout, (state) => {
        // Reset state on logout
        state.countriesByRegion = {};
        state.status = 'idle';
        state.error = null;
      });;
  },
});

export default countriesSlice.reducer;
