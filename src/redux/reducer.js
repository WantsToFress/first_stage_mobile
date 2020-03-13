import {createReducer} from "@reduxjs/toolkit";
import * as actions from './actions'
import initState from '../constants/initState'
import {mergeRight} from 'ramda';
import axios from '../constants/axios'
import append from "ramda/src/append";

const RootReducer = createReducer(initState, {
    [actions.getEvents + '_FULFILLED']: (state, action) => {
        alert(JSON.stringify(action.payload))
        return mergeRight(state, {events: action.payload.events})
    },
    [actions.getEvents + '_REJECTED']: (state, action) => {
        alert(JSON.stringify(action.payload))
        return mergeRight(state, {error: action.payload})
    },

    [actions.getUsers + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {currentUsers: action.payload.persons})
    },
    [actions.getUsers + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },

    [actions.sendMessage + '_FULFILLED']: (state, action) => {
        return state
    },
    [actions.sendMessage + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },

    [actions.subscribe + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {messages: append(action.payload, state.messages)})
    },
    [actions.subscribe + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },

    [actions.unsubscribe + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {messages: []})
    },
    [actions.unsubscribe + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },

    [actions.register + '_FULFILLED']: (state, action) => {
        alert(JSON.stringify(action.payload))
        axios.defaults.headers.common['Authorization'] = action.payload.token;
        return state
    },
    [actions.register + '_REJECTED']: (state, action) => {
        alert(JSON.stringify(action.payload))
        return mergeRight(state, {error: action.payload})
    },

    [actions.logIn + '_FULFILLED']: (state, action) => {
        axios.defaults.headers.common['Authorization'] = action.payload.token;
        return state
    },
    [actions.logIn + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },

    [actions.setData]: (state, action) => {
        return mergeRight(state, action.payload)
    },
});

export default RootReducer
