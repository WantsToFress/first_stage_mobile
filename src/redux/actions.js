import {createAction} from "redux-actions";
import {call} from "../lib/api";

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export const getEvents = createAction('get/events', data => {
    return call('get', `/events/`, null, {});
});

export const getUsers = createAction('get/users', data => {
    return call('get', `/persons/`, null, {});
});

export const sendNewEvent = createAction('post/event', data => {
    return call('post', `/event/`, null, {});
});

export const sendNewGroup = createAction('post/group', data => {
    return call('post', `/group/`, null, {});
});

export const logIn = createAction('post/login', data => data);

export const register = createAction('post/reg', data => data);

export const setData = createAction('nav/set', data => data);
