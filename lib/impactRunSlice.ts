import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '@/actions/userActions';
interface ImpactRun {
  id: string;
  name: string;
  description: string;
  templateId: string;
  productId: string;
  status: string;
  percentage: number;
  viewOnly: boolean;
  createdOn: string;
}

interface ImpactRunState {
  impactRuns: ImpactRun[];
  status: string;
  error: string | null | undefined;
}
export const fetchImpactRuns: any = createAsyncThunk(
    'impactRuns/fetchImpactRuns',
    async (token: string, { rejectWithValue }) => {
      try {
        const response = await axios.get("/api/impact-run", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Check for a 404 or other error response status
        if (response.status === 404) {
          return rejectWithValue('Impact run not found');  // Pass custom error message
        }
        
        return response.data;
      } catch (error: any) {
        // Catch any other errors
        return rejectWithValue(error.response?.data || 'Failed to fetch impact runs');
      }
    }
  );
  

const impactRunSlice = createSlice({
    name: 'impactRuns',
    initialState: {
      impactRuns: [],
      status: 'idle',
      error: null,
    } as ImpactRunState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchImpactRuns.pending, (state) => {
          state.status = 'loading';
          state.error = null; // Reset errors on a new request
        })
        .addCase(fetchImpactRuns.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.impactRuns = action.payload;
        })
        .addCase(fetchImpactRuns.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to fetch impact runs';
        })
        .addCase(logout, (state) => {
          // Reset state on logout
          state.impactRuns= [];
          state.status = 'idle';
          state.error = null;
        });
    },
  });
  
export default impactRunSlice.reducer;
