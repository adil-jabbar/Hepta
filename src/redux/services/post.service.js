import axios from 'axios';
import { CONSTANTS } from '../../constants';
import { store } from '../store';

const postApi = (data, url) => {

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    return axios
        .post(CONSTANTS.API_URLS.BASE_URL + url, data)
        .then(onSuccess)
        .catch(onFailure);
};



const postService = {
    postApi,
};

export default postService;
