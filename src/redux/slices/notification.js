import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import getService from '../services/get.services';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import {store} from '../store';

const initialState = {
  notification: null,
};

export const notificationAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_NOTIFICATION,
  async (params, thunk) => {
    const confiq = {
      headers: {
        Authorization: store.getState()?.auth.accessToken,
      },
    };
    try {
      const response = await getService.get(
        CONSTANTS.API_URLS.GET_NOTIFICATION,
        confiq,
      );
      thunk.dispatch(
        notificationSlice.actions.saveNotification(response?.data?.records),
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    saveNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const {saveNotification} = notificationSlice.actions;
export default notificationSlice.reducer;
