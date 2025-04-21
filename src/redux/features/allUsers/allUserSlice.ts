import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store"; // Adjust path as needed

// Define the TUser type based on your backend and usage
type TUser = {
  _id: string;
  email: string;
  phone: string;
  address: string;
  name: string;
  password: string; // Note: Typically not returned by backend
  passwordChangedAt?: string | Date; // Allow string (ISO) or Date, optional
  role: "admin" | "customer";
  status: "deactivated" | "active";
  isDeleted: boolean;
  createdAt: string; // ISO string from backend
};

// Define the state type
type TAllUserState = {
  users: TUser[];
};

// Initial state
const initialState: TAllUserState = {
  users: [],
};

// Create the slice
const allUserSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    // Reducer to set all users
    setAllUsers: (state, action: PayloadAction<TUser[]>) => {
      state.users = action.payload;
    },
    // Reducer to toggle user status locally
    deactivateUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const user = state.users.find((u) => u._id === userId);
      if (user) {
        user.status = user.status === "active" ? "deactivated" : "active";
      }
    },
  },
});

// Export actions and reducer
export const { setAllUsers, deactivateUser } = allUserSlice.actions;
export default allUserSlice.reducer;

// Selector to get all users from state
export const selectAllUsers = (state: RootState) => state.allUsers.users;