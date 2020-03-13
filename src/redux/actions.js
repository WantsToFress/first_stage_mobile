import {createAction} from "redux-actions";
import {call, post, send} from "../lib/api";

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

export const logIn = createAction('post/login', data => {
    return call('post', `/login/`, null, data);
});

export const register = createAction('post/reg', data => {
    return post(`/register/`, null, data);
});

export const sendMessage = createAction('post/message', message => {
    return send(message)
});

export const subscribe = createAction('post/listener', id => {
    return subscribe(id)
});

export const unsubscribe = createAction('post/kill_listener', () => {
    return unsubscribe()
});

export const setData = createAction('nav/set', data => data);
