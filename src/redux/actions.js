import {createAction} from "redux-actions";
import {call, post, send} from "../lib/api";

export const getEvents = createAction('get/events', data => {
    return call('get', `/events/`, null, {});
});

export const getUser = createAction('get/user', () => {
    return call('get', `/i/`, null, {});
});

export const getUsers = createAction('get/users', data => {
    return call('get', `/persons/`, null, data);
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

export const sendMessage = createAction('post/message', (id, message) => {
    return send(message)
});

export const subscribe = createAction('post/listener', id => {
    return new Promise((res, rej) => res([
        {
            message: 'aaa',
            time: 54124634,
            full_name: 'Солнышков Андрей Дмитриевич',
            uid: 2,
            id: 1,
            login: 'kodonomo',
            event_id: 1
        },
        {
            message: 'aadssdfgsfdga', time: 54124645, full_name: 'Солнышков Андрей Дмитриевич', uid: 2, id: 2,
            login: 'kodonomo',
            event_id: 1
        },
        {
            message: 'vv', time: 54124683, full_name: 'Солнышков Андрей Дмитриевич', uid: 2, id: 3,
            login: 'kodonomo',
            event_id: 1
        },
        {
            message: 'aeryy6uj 3rth4tyu4ty he tyu 4aa tsr nh4 tg wbktiohwuiogjergu0wgwerugh wioerjgi whtguj qiop wtughiqwjkergkeripg[ekr',
            time: 54124999,
            full_name: 'Бухтийчук Владимир Павлович',
            uid: 0,
            id: 4,
            login: 'v_unemloyed',
            event_id: 1
        },
        {
            message: 'argw y weth rtherth erjaa',
            time: 54129634,
            full_name: 'Сосновский Роман Викторович',
            uid: 1,
            id: 5,
            login: 'rvsosn',
            event_id: 1
        }
    ]))//subscribe(id)
});

export const unsubscribe = createAction('post/kill_listener', () => {
    return unsubscribe()
});

export const setData = createAction('nav/set', data => data);
