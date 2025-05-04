import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import getService from '../services/get.services';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import {store} from '../store';
import postService from '../services/postWithToken';

const initialState = {
  profile: null,
  relatedZip: [],
  dashboard:null,
  mapping:null
};

export const dashboardAction = createAsyncThunk(
  CONSTANTS.API_URLS.DASHBOARD,
  async (params, thunk) => {
    const confiq = {
      headers: {
        Authorization: "Bearer " + store.getState()?.auth.accessToken,
      },
    };
    try {
      const response = await getService.get(
        CONSTANTS.API_URLS.DASHBOARD,
        confiq,
      );
      thunk.dispatch(profileSlice.actions.saveDashboard(response?.data));
      
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);
export const orderMappingAction = createAsyncThunk(
  CONSTANTS.API_URLS.ORDER_MAPPING,
  async (params, thunk) => {
    const confiq = {
      headers: {
        Authorization: "Bearer " + store.getState()?.auth.accessToken,
      },
    };
    try {
      const response = await getService.get(
        CONSTANTS.API_URLS.ORDER_MAPPING,
        confiq,
      );

      thunk.dispatch(profileSlice.actions.saveOrderMapping(response?.data));
      
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);


export const profileAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PROFILE,
  async (params, thunk) => {
    const confiq = {
      headers: {
        Authorization: store.getState()?.auth.accessToken,
      },
    };
    try {
      const response = await getService.get(
        CONSTANTS.API_URLS.GET_PROFILE,
        confiq,
      );
      thunk.dispatch(profileSlice.actions.saveProfile(response?.data?.records));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const updateProfile = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PROFILE,
  async (body, thunk) => {
    try {
      const response = await postService.postWithToken(
        CONSTANTS.API_URLS.UPDATE_PROFILE,
        body,
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveRelatedZip: (state, action) => {
      state.relatedZip = action.payload;
    },

    saveProfile: (state, action) => {
      state.profile = action.payload;
    },
    saveDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    saveOrderMapping: (state, action) => {
      state.mapping = action.payload;
    },

    
  },
});

export const {saveProfile} = profileSlice.actions;
export default profileSlice.reducer;
