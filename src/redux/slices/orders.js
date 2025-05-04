import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import getService from '../services/get.services';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import {store} from '../store';
// import postService from '../services/post.service';
import postService from '../services/postWithToken';

const initialState = {
  pending: [],
  deliver:[],
  cancel:[],
  riderHistory:[]
};

export const orderPendingAction = createAsyncThunk(
  CONSTANTS.API_URLS.ORDERLIST,
  async (body, thunk) => {
    try {
      const response = await postService.postWithToken(
        CONSTANTS.API_URLS.ORDERLIST,
        body,
      );
      thunk.dispatch(orderSlice.actions.saveOrderPending(response?.data));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);
export const orderDeliverAction = createAsyncThunk(
  CONSTANTS.API_URLS.ORDERLIST,
  async (body, thunk) => {
    try {
      const response = await postService.postWithToken(
        CONSTANTS.API_URLS.ORDERLIST,
        body,
      );
      thunk.dispatch(orderSlice.actions.saveOrderDeliver(response?.data));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);
export const orderPendingCancel = createAsyncThunk(
  CONSTANTS.API_URLS.ORDERLIST,
  async (body, thunk) => {
    try {
      const response = await postService.postWithToken(
        CONSTANTS.API_URLS.ORDERLIST,
        body,
      );
      thunk.dispatch(orderSlice.actions.saveOrderCancel(response?.data));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);


export const riderHistoryAction = createAsyncThunk(
  CONSTANTS.API_URLS.RIDER_HISTORY, // Correct API URL for rider history
  async (body, thunk) => {
    try {
      const response = await postService.postWithToken(
        CONSTANTS.API_URLS.RIDER_HISTORY, // Correct API URL
        body
      );
      const responseData = response;
      thunk.dispatch(orderSlice.actions.saveRiderHistory(responseData));
      return responseData;
    } catch (error) {
      const err = utils.showResponseError(error);
      return err;
    }
  }
);


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    saveOrderPending: (state, action) => {
      state.pending = action.payload;
    },
    saveOrderDeliver: (state, action) => {
      state.deliver = action.payload;
    },
    saveOrderCancel: (state, action) => {
      state.cancel = action.payload;
    },
    saveRiderHistory: (state, action) => {
      state.riderHistory = action.payload;
    },

  },
});

export const {saveRiderHistory,saveOrderPending, saveOrderCancel, saveOrderDeliver} = orderSlice.actions;
export default orderSlice.reducer;
