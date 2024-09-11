import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '@/actions/userActions';
interface Organization {
  id: string;
  name: string;
  countryId: string;
  industryId: string;
  parentId: string;
  children: any[]; // Adjust type as needed
  createdOn: string;
  createdById: string;
  logoUrl: string | null;
}

interface OrganizationState {
  organization: Organization | null;
  status: string;
  error: string | null | undefined;
}
export const fetchOrganizationDetails: any = createAsyncThunk(
  'organization/fetchOrganizationDetails',
  async ({ organizationId, token }: { organizationId: string; token: string }) => {
 const response = await axios.get(`/api/organization/${organizationId}/detail`, {
  headers: {
    Authorization: `Bearer ${token}`, // Include the token if needed
  },
});
    return response.data;
  }
);



const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    organization: null,
    status: 'idle',
    error: null as string | null | undefined,
  } as OrganizationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organization = action.payload;
      })
      .addCase(fetchOrganizationDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout, (state) => {
        // Reset state on logout
        state.organization;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default organizationSlice.reducer;
