import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth";

const initialState = {
  currentUserID: "",
  userLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUserID = action.payload;
      state.userLoggedIn = !!action.payload;
    },
  },
});
export const { setCurrentUser } = authSlice.actions;
export const initializeUser = () => (dispatch) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser.uid));
    }
  });
};
export default authSlice.reducer;
