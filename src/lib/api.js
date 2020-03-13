import axios from '../constants/axios'
import Centrifuge from "centrifuge";

export const call = (method, endpoint, args, data, headers = null) => {
    return axios({
        method: method,
        url: endpoint,
        data: data
    });
};

export const post = (endpoint, args, data, headers = null) => {
    return axios.post(endpoint, data);
};

const centrifuge = new Centrifuge('ws://10.0.0.194:8000/connection/websocket');

export const subscribe = (id) => centrifuge.subscribe(id, function (message) {
    return message
});

export const unsubscribe = () => centrifuge.disconnect();

export const send = (message) => centrifuge.send(message, () => {});

centrifuge.connect();
