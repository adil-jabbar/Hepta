import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showSimpleMessage} from '../../utils/flashMessage';
import postService from '../services/post.service';
import postTokenService from '../services/postWithToken';
import getService from '../services/get.services';
import getWidthoutTokenApi from '../services/getWidthoutoken.services';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import {store} from '../store';

const initialState = {
  accessToken: null,
  signupData: {},
  userData: null,
};

export const login = createAsyncThunk(
  CONSTANTS.API_URLS.LOGIN,
  async (data, thunk) => {
    try {
      const response = await postService.postApi(
        data,
        CONSTANTS.API_URLS.LOGIN,
      );
      thunk.dispatch(authSlice.actions.saveAccessToken(response?.access_token));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const signup = createAsyncThunk(
  CONSTANTS.API_URLS.SIGN_UP,
  async (data, thunk) => {
    try {
      const response = await postService.postApi(
        data,
        CONSTANTS.API_URLS.SIGN_UP,
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      if (err?.phone) {
        showSimpleMessage('danger', {
          message: err.phone,
        });
        // utils.errorAlert(err?.phone);
      }
      if (err?.email) {
        // utils.errorAlert(err?.email);
        showSimpleMessage('danger', {
          message: err.email,
        });
      }
      console.log('error:', err);
      throw err;
    }
  },
);

export const verifyOtp = createAsyncThunk(
  CONSTANTS.API_URLS.VERIFY_OTP,
  async (postData, thunk) => {
    try {
      const response = await postService.postApi(
        postData,
        CONSTANTS.API_URLS.VERIFY_OTP,
      );
      thunk.dispatch(authSlice.actions.saveAccessToken(response?.data?.token));
      thunk.dispatch(authSlice.actions.saveUserData(response?.data?.name)); // Add this line to save user data

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const updateProfile = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PROFILE,
  async (body, thunk) => {
    try {
      const response = await postTokenService.postWithToken(
        CONSTANTS.API_URLS.UPDATE_PROFILE,
        body,
      );
      thunk.dispatch(authSlice.actions.saveUserData(response?.data?.name));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const forgotPassword = createAsyncThunk(
  CONSTANTS.API_URLS.FORGOT_PASSWORD,
  async (param, thunk) => {
    try {
      const response = await getWidthoutTokenApi.getWidthoutTokenApi(
        param,
        CONSTANTS.API_URLS.FORGOT_PASSWORD,
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const resetPassword = createAsyncThunk(
  CONSTANTS.API_URLS.RESET_PASSWORD,
  async (data, thunk) => {
    try {
      const response = await postService.postApi(
        data,
        CONSTANTS.API_URLS.RESET_PASSWORD,
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const changePassword = createAsyncThunk(
  CONSTANTS.API_URLS.CHANGE_PASSWORD,
  async (body, thunk) => {
    try {
      const response = await postTokenService.postWithToken(
        CONSTANTS.API_URLS.CHANGE_PASSWORD,
        body,
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const logout = createAsyncThunk(
  CONSTANTS.API_URLS.LOGOUT,
  async ({}, thunk) => {
    try {
      const confiq = {
        headers: {
          Authorization: store.getState()?.auth.accessToken,
        },
      };
      const response = await postTokenService.postWithToken(CONSTANTS.API_URLS.LOGOUT);

      showSimpleMessage('success', {
        message: response?.message,
      });

      console.log(response);
      

      setTimeout(() => {
        thunk.dispatch(authSlice.actions.removeAccessToken());
      }, 200);



      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const deleteAccount = createAsyncThunk(
  CONSTANTS.API_URLS.DEACTIVATE,
  async ({}, thunk) => {
    try {
      const response = await postTokenService.postWithToken(
        CONSTANTS.API_URLS.DEACTIVATE,
        {},
      );
      // const response = await authService.deactivate();
      utils.successAlert(response?.message);

      thunk.dispatch(authSlice.actions.removeAccessToken());
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      console.log('err', err);
      throw err;
    }
  },
);

export const setSignUpData = createAsyncThunk(
  CONSTANTS.API_URLS.LOGOUT,
  async (data, thunk) => {
    try {
      thunk.dispatch(authSlice.actions.setSignUpData(data));
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const saveAccessTokenToStorage = accessToken => {
  AsyncStorage.setItem(
    CONSTANTS.CACHE_KEYS.ACCESS_TOKEN,
    JSON.stringify(accessToken),
  );
};

const removeAccessTokenFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.CACHE_KEYS.ACCESS_TOKEN);
};

const saveUserDataToStorage = userData => {
  // Assuming userData is already a string
  AsyncStorage.setItem(
    CONSTANTS.CACHE_KEYS.USER_DATA,
    JSON.stringify(userData),
  );
};

const removeUserDataFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.CACHE_KEYS.USER_DATA);
};

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     saveAccessToken: (state, action) => {
//       state.accessToken = action.payload;
//       saveAccessTokenToStorage(action.payload);
//     },
//     saveUserData: (state, action) => {
//       // Define the saveUserData action
//       state.userData = action.payload;
//     },
//     setSignUpData: (state, action) => {
//       state.signupData = action.payload;
//     },
//     removeAccessToken: (state, action) => {
//       state.accessToken = null;
//       removeAccessTokenFromStorage();
//     },
//   },
// });

// export const {saveAccessToken, removeAccessToken} = authSlice.actions;
// export default authSlice.reducer;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
      saveAccessTokenToStorage(action.payload);
    },
    saveUserData: (state, action) => {
      state.userData = action.payload;
      saveUserDataToStorage(action.payload);
    },
    setSignUpData: (state, action) => {
      state.signupData = action.payload;
    },
    removeAccessToken: state => {
      state.accessToken = null;
      removeAccessTokenFromStorage();
    },
    removeUserData: state => {
      state.userData = null;
      removeUserDataFromStorage();
    },
  },
});

export const {
  saveAccessToken,
  removeAccessToken,
  saveUserData,
  removeUserData,
} = authSlice.actions;
export default authSlice.reducer;
