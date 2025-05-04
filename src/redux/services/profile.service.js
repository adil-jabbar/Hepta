import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const profile = () => {
  const confiq = {
    headers: {
      Authorization: store?.getState()?.auth?.accessToken,
    },
  };

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    console.log('error:', error);
    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_URLS.BASE_CUSTOMER + CONSTANTS.API_URLS.GET_PROFILE,
      confiq,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const updateProfile = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_URLS.BASE_CUSTOMER + CONSTANTS.API_URLS.UPDATE_PROFILE,
      data,
      {
        headers: {
          Authorization: store?.getState()?.auth?.accessToken,
        },
      },
    )
    .then(onSuccess)
    .catch(onFailure);
};

const profileService = {
  profile,
  updateProfile,
};

export default profileService;
