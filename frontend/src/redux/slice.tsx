import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  gitHubState: {
    userInfo: {},
    userRepositories: [],
    userFollowers: [],
    selectedFollowersUsername: "",
    selectedFollowersDetails: [],
    selectedFollowersRepositories: [],
  },
};

const gitHubSlice = createSlice({
  name: "gitHubState",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.gitHubState = {
        ...state.gitHubState,
        userInfo: action.payload,
      };
    },
    updateUserRepositories: (state, action) => {
      state.gitHubState = {
        ...state.gitHubState,
        userRepositories: action.payload,
      };
    },
  },
});

export const { updateUserInfo, updateUserRepositories } = gitHubSlice.actions;
export const gitHubReducer = gitHubSlice.reducer;
