import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginData: [],
    isLoggedIn: false
};
export const loginSlice = createSlice({
    name: 'addUser',
    initialState,
    reducers: {
      addUser: (state, action) => {
        state.loginData.push({username: action.payload.username, password: action.payload.password});
        state.isLoggedIn = true;
        // console.log(state.loginData)
      },
    },
});
export const { addUser } = loginSlice.actions;
export default loginSlice.reducer;