import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
  familyName: string;
  role: string;
  organizationId: string;
  organizationRole: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: '',
  name: '',
  familyName: '',
  role: '',
  organizationId: '',
  organizationRole: '',
  isLoggedIn: false,
};


const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.familyName = action.payload.familyName;
      state.role = action.payload.role;
      state.organizationId = action.payload.organizationId;
      state.organizationRole = action.payload.organizationRole;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.name = '';
      state.familyName = '';
      state.role = '';
      state.organizationId = '';
      state.organizationRole = '';

      // Clear user data from localStorage on logout
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
