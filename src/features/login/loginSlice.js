import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const initialState = {
  loginData: [],
  isLoggedIn: false,
  userData: [],
  userTransactions: {
    Transactions: {
      userBalance: "0",
      userIncome: "0",
      userExpense: "0",
    },
  },
  profilepic: "",
  setProfilepicURL: "",
};

// Thunk action to update user transactions in Firestore
export const updateUserTransactions = createAsyncThunk(
  "addUser/updateUserTransactions",
  async (newData, thunkAPI) => {
    try {
      const uid = auth.currentUser.uid;
      const updateTransactionsDoc = doc(db, "userTransactions", uid);
      
      await updateDoc(updateTransactionsDoc, {
        userBalance: newData.userBalance,
        userIncome: newData.userIncome,
        userExpense: newData.userExpense,
      });
    } catch (error) {
      console.error("Error updating user transactions:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk action to fetch user transactions from Firestore
export const fetchUserTransactions = createAsyncThunk(
  "addUser/fetchUserTransactions",
  async (_, thunkAPI) => {
    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "userTransactions", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data;
      } else {
        console.log("No such document!");
        return {}; // Return empty object or handle absence of data
      }
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      throw error;
    }
  }
);

// Thunk action to fetch avatar from Firebase Storage (example)
export const fetchAvatar = createAsyncThunk(
  "userAvatar/fetchAvatar",
  async (_, thunkAPI) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, "path/to/avatar.jpg");

      const downloadURL = await getDownloadURL(storageRef);
      console.log("Avatar URL:", downloadURL);

      return downloadURL; // Return download URL if needed
    } catch (error) {
      console.error("Error fetching avatar:", error);
      throw error;
    }
  }
);

export const loginSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    updateLoginState: (state, action) => {
      state.loginData.push({
        username: action.payload.username,
        password: action.payload.password,
      });
      state.isLoggedIn = true;
    },
    addUserData: (state, action) => {
      state.userData.push({ data: action.payload.userData });
      state.isLoggedIn = true;
    },
    getUserTransactions: (state, action) => {
      state.userTransactions.Transactions.userBalance =
        action.payload.userBalance || "0";
      state.userTransactions.Transactions.userIncome =
        action.payload.userIncome || "0";
      state.userTransactions.Transactions.userExpense =
        action.payload.userExpense || "0";
    },
    setProfilePic: (state, action) => {
      debugger;
      state.profilepic =  action.payload;
    },
    uploadProfilePicURL: (state, action) => {
      state.setProfilepicURL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        if (action.payload) {
          state.userTransactions.Transactions = {
            ...state.userTransactions.Transactions,
            ...action.payload,
            currentUser: auth.currentUser?.email || "",
            currentUID: auth.currentUser?.uid || "",
          };
        }
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        console.error("Failed to fetch user transactions:", action.error.message);
      });
  },
});

export const {
  updateLoginState,
  addUserData,
  getUserTransactions,
  setProfilePic,
  uploadProfilePicURL,
} = loginSlice.actions;

export default loginSlice.reducer;
