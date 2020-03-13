import axios from '../constants/axios'
import Centrifuge from "centrifuge";

export const call = (method, endpoint, args, data, headers = null) => {
    return new Promise((res, rej) => {
        switch (endpoint) {
            case '/login/':
                return res('fgerthnruyk retg wjmryj rth')
            case '/events/':
                return res({
                    events: [
                        {
                            id: 0,
                            name: 'Первое событие',
                            description: 'berjnnryjert',
                            start: 1589523456789,
                            end: 1589593456789,
                            type: 'OPENED',
                            members: [
                                {full_name: 'Бухтийчук Владимир Павлович', uid: 0, login: 'v_unempoled'},
                                {full_name: 'Сосновский Роман Викторович', uid: 1, login: 'rvsosn'},
                            ],
                            admins: [
                                {full_name: 'Солнышков Андрей Дмитриевич', uid: 2, login: 'kodonomo'}
                            ],
                            creator_id: 2,
                            is_self_assignable: true
                        },
                        {
                            id: 1,
                            name: 'Группа А',
                            description: 'berjnnryjert',
                            type: 'GROUP',
                            members: [
                                {full_name: 'Бухтийчук Владимир Павлович', uid: 0, login: 'v_unempoled'},
                            ],
                            admins: [
                                {full_name: 'Солнышков Андрей Дмитриевич', uid: 2, login: 'kodonomo'}
                            ],
                            groups: [
                                {
                                    id: 0,
                                    name: 'A',
                                    description: 'fgsghr'
                                }
                            ],
                            creator_id: 2,
                            is_self_assignable: true
                        },
                        {
                            id: 2,
                            name: 'Закрытое мероприятие',
                            description: 'berjnnryjert',
                            type: 'CLOSED',
                            members: [
                                {full_name: 'Солнышков Андрей Дмитриевич', uid: 2, login: 'kodonomo'},
                            ],
                            admins: [
                                {full_name: 'Кто-тов Кто-то Кто-тович', uid: 3, login: 'owowow'}
                            ],
                            creator_id: 3,
                            is_self_assignable: true
                        }
                    ]
                })
            case '/i/':
                return res({
                    data: {
                        full_name: 'Солнышков Андрей Дмитриевич',
                        login: 'kodonomo',
                        uid: 2,
                        role: 'admin'
                    }
                });
            case '/persons/':
                return {
                    persons: [
                        {full_name: 'Солнышков Андрей Дмитриевич', uid: 2, login: 'kodonomo'},
                        {full_name: 'Бухтийчук Владимир Павлович', uid: 0, login: 'v_unempoled'},
                        {full_name: 'Сосновский Роман Викторович', uid: 1, login: 'rvsosn'},
                        {full_name: 'Кто-тов Кто-то Кто-тович', uid: 3, login: 'owowow'}
                    ]
                };
            default:
                return ;
        }
    })
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

export const send = (id, message) => {
    centrifuge.publish(id, message);
    centrifuge.publish('all', message);
}

centrifuge.connect();
