import axios from '../constants/axios'

export const call = (method, endpoint, args, data, headers=null) => {
    return axios({
        method: method,
        url: endpoint,
        data: data
    });
};
