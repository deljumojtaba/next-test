import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '@/actions/userActions';
interface Recommendation  {
 
  deleted:boolean;
  dimensionId:string;
  endDate: string;
  id: string;
  impactRunId: string;
  importance:number;
  index:number;
  scoreGap:number;
  sessionGap:number;
  startDate: string; 
  topicBenchmark:number;
  topicRecommendation: TopicRecommendation;
  topicScore:number;
  urgency:number;

}

interface TopicRecommendation {
  capex:boolean
  condition:string
  description:string
  dimension:string
  dimensionId:string
  displayOrder:number
  id: string
  importance: string
  initiativeSize: string
  opex:boolean
  product: string
  recommendation: string
  recommendationType: string
  section:string
  topic:string
  urgency:number;
}
interface RecommendationState {
  recommendations: Recommendation[];
  status: string;
  error: string | null | undefined;
}

export const fetchRecommendations:any = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async ({ impactRunId, token }: { impactRunId: string; token: string }) => {
    const response = await axios.get(`/api/impact-run/${impactRunId}/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    recommendations: [],
    status: 'idle',
    error: null,
  } as RecommendationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recommendations';
      })
      .addCase(logout, (state) => {
        // Reset state on logout
        state.recommendations = [];
        state.status = 'idle';
        state.error = null;
      });
      
  },
});

export default recommendationSlice.reducer;
