import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    windowWidth: 0
};

export const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setWindowWidth (state, action) {
        console.log(action.payload);
        state.windowWidth = action.payload
    }

  },
});
export const { setWindowWidth } = windowSlice.actions;

export default windowSlice.reducer;
