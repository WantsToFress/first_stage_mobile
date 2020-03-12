import {createReducer} from "@reduxjs/toolkit";
import * as actions from './actions'
import initState from '../constants/initState'
import {mergeRight} from 'ramda';

const RootReducer = createReducer(initState, {
    [actions.getEvents + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {events: action.payload.events})
    },
    [actions.getEvents + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },

    [actions.setData]: (state, action) => {
        return mergeRight(state, action.payload)
    },
});

export default RootReducer
