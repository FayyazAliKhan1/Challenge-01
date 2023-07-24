import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGistForUser, getPublicGists } from "../../services/gistService";

export const fetchUserGists = createAsyncThunk(
  "gists/fetchUserGists",
  async (username, { getState }) => {
    try {
      // I have saved the data of public and searched user in one place cause according to your UI
      // it's showing only one single list
      const { publicGists } = getState().gists;
      // if the data of this user is already present then just move to top of the
      // list so that it's visible, otherwise just get the data from the api
      let present = publicGists.find(
        (data) => data.owner.login.toLowerCase() === username.toLowerCase()
      );
      if (present) {
        const filteredArr = publicGists.filter(
          (data) => data.owner.login.toLowerCase() !== username.toLowerCase()
        );
        const resultArr = [present, ...filteredArr];
        return resultArr;
      }
      const response = await getGistForUser(username);
      if (response.data.length === 0)
        throw new Error("Not found for this user");
      return [response.data[0], ...publicGists]; // saving only one gist if there are many gist for
      //    the same users, I chose this myself cause the requirements are not mentioned for this case
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const fetchPublicGists = createAsyncThunk(
  "gists/fetchPublicGists",
  async () => {
    // I have not applied pagination, cause there is no such requirement mentioned
    try {
      const response = await getPublicGists();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const initialState = {
  publicGists: [],
  isLoading: false,
};
const gistSlice = createSlice({
  name: "gists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserGists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserGists.fulfilled, (state, action) => {
        state.publicGists = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserGists.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPublicGists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicGists.fulfilled, (state, action) => {
        state.publicGists = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPublicGists.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const {  } = gistSlice.actions;
export default gistSlice.reducer;
