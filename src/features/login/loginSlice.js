import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginData: [],
    isLoggedIn: false,
    userData: [],
    userTransactions: {}
};
export const loginSlice = createSlice({
    name: 'addUser',
    initialState,
    reducers: {
      updateLoginState: (state, action) => {
        state.loginData.push({username: action.payload.username, password: action.payload.password});
        state.isLoggedIn = true;
        // console.log(state.loginData)
      },
      addUserData: (state, action) => {
        state.userData.push({data: action.payload.userData});
        state.isLoggedIn = true;
        // console.log(state.loginData)
      },
      getUserTransactions(state, action){
        state.userTransactions["Transactions"] = action.payload;
        console.log(state.userTransactions);
      }
    },
});
export const { updateLoginState, addUserData, getUserTransactions} = loginSlice.actions;

export default loginSlice.reducer;