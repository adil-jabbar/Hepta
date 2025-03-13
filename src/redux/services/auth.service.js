import axios from 'axios';
import { CONSTANTS } from '../../constants';
import { store } from '../store';

const login = (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_CUSTOMER + CONSTANTS.API_URLS.LOGIN, formData)
    .then(onSuccess)
    .catch(onFailure);
};

const signup = data => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_CUSTOMER + CONSTANTS.API_URLS.SIGN_UP, data)
    .then(onSuccess)
    .catch(onFailure);
};

const verifyOtp = (email, otp) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('otp', otp);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_CUSTOMER}${CONSTANTS.API_URLS.VERIFY_OTP}`,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const forgotPassword = async email => {
  const formData = new FormData();
  formData.append('email', email);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_CUSTOMER}${CONSTANTS.API_URLS.FORGOT_PASSWORD}`,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const resetPassword = data => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_CUSTOMER}${CONSTANTS.API_URLS.RESET_PASSWORD}`,
      data,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const logout = async () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_CUSTOMER + CONSTANTS.API_URLS.LOGOUT, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const deactivate = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  const data = {
    userID: store?.getState()?.profile?.profile?.id,
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.DEACTIVATE, data, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const authService = {
  login,
  signup,
  logout,
  deactivate,
  verifyOtp,
  forgotPassword,
  resetPassword,
};

export default authService;
