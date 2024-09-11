import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '@/actions/userActions';
// Define the type for the industry
interface Industry {
  id: string;
  name: string;
  code: string | null;
  parent: Industry | null;
}

// Define the slice state type
interface IndustriesState {
  industries: Industry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the slice
const initialState: IndustriesState = {
  industries: [],
  status: 'idle',
  error: null,
};


export const fetchIndustries:any = createAsyncThunk(
  'industries/fetchIndustries',
  async ({  token }: {token: string }) => {
    const response = await axios.get(`/api/industries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const industriesSlice = createSlice({
  name: 'industries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchIndustries.fulfilled,
        (state, action: PayloadAction<Industry[]>) => {
          state.status = 'succeeded';
          state.industries = action.payload;
        }
      )
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch industries';
      })
      .addCase(logout, (state) => {
        // Reset state on logout
        state.industries = [];
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default industriesSlice.reducer;
