import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginData: [],
    isLoggedIn: false,
    userData: []
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
      addUserData: (state, action) => {
        state.userData.push({data: action.payload.userData});
        state.isLoggedIn = true;
        // console.log(state.loginData)
      }
    },
});
export const { addUser, addUserData} = loginSlice.actions;

export default loginSlice.reducer;