import axios from 'axios';
import { CONSTANTS } from '../../constants';
import { store } from '../store';

const getWidthoutTokenApi = (param, url) => {


    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    return axios
        .get(CONSTANTS.API_URLS.BASE_URL + url, {
            params: param
        })
        .then(onSuccess)
        .catch(onFailure);
};


const getWidthoutTokenApiService = {
    getWidthoutTokenApi,

};

export default getWidthoutTokenApiService;
