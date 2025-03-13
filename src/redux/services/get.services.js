import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const get = (url, params) => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + url, params)
    .then(onSuccess)
    .catch(onFailure);
};

const getService = {
  get,
};

export default getService;
