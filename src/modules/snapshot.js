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
import Data from '../data';

// action types
const GET_SNAPSHOTS = 'snapshot/snapshots';

function getPostAPI() {
    return axios.get(`${Data.restAPIUrl}/distributions/${Data.distributionName}/snapshots`)
}

export const getSnapshotList = createAction(GET_SNAPSHOTS, getPostAPI);

// reducer
export default handleActions({
    ...pender({
        type: GET_SNAPSHOTS,
        onSuccess: (state, action) => {

            // sort by snapshot creation time
            function custonSort(a, b) {
                if (a.createTime === b.createTime) {
                    return 0
                }
                return a.createTime < b.createTime ? 1 : -1;
            }
            action.payload.data.sort(custonSort);

            return action.payload.data;
        }
    })
}, []);