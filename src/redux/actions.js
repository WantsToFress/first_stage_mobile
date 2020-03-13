import {createAction} from "redux-actions";
import {call} from "../lib/api";

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export const getEvents = createAction('get/events', data => {
    return call('get', `/events/`, null, {});
});

export const getUsers = createAction('get/events', data => {
    return call('get', `/persons/`, null, {});
});

export const logIn = createAction('post/login', data => data);

export const register = createAction('post/reg', data => data);

export const setData = createAction('nav/set', data => data);
