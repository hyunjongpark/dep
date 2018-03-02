/*
* Platform DevOps
*
* Copyright (c) 2018 Samsung Electronics Co., Ltd. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Contributors:
* - S-Core Co., Ltd
*
*/
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';
import { Map } from 'immutable';

import Data from '../data'

// action types
const GET_DISTRIBUTIONS = 'distribution/distributions';
const SET_DISTRIBUTION_NAME = 'distribution/setMame';

function getPostAPI() {
    return axios.get(`${Data.restAPIUrl}/distributions`)
}

export const getDistributionList = createAction(GET_DISTRIBUTIONS, getPostAPI);
export const setDistributionName = createAction(SET_DISTRIBUTION_NAME);

const initialState = Map({
    name: 'dep-staging',
    list: []
});


// reducer
export default handleActions({
    ...pender({
        type: GET_DISTRIBUTIONS,
        onSuccess: (state, action) => {
            return state.set('list', action.payload.data);
        }
    }),

    [SET_DISTRIBUTION_NAME]: (state, action) => {
        return state.set('name', action.payload);
    }
}, initialState);