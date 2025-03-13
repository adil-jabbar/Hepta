import axios from 'axios';
import { CONSTANTS } from '../../constants';
import { store } from '../store';

const postWithToken = async (uri, body) => {
  const token = store.getState()?.auth.accessToken;

  if (!token) {
    throw new Error('Access token is missing');
  }

  let config = {
    headers: {
      // Properly interpolate the token into the Bearer format
      Authorization: `Bearer ${token}`, 
    },
  };

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};

const PostWithToken = {
  postWithToken,
};

export default PostWithToken;
