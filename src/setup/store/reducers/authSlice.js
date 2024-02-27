import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth";

const initialState = {
  currentUserID: "",
  userLoggedIn: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUserID = action.payload;
      state.userLoggedIn = !!action.payload;
      state.isLoading = false;
    },
    resetCurrentUser(state) {
      state.currentUserID = "";
      state.userLoggedIn = false;
      state.isLoading = false;
    },
  },
});
export const { setCurrentUser, resetCurrentUser } = authSlice.actions;
export const initializeUser = () => (dispatch) => {
  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setCurrentUser(currentUser?.uid));
  });
};
export default authSlice.reducer;
