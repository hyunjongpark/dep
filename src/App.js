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
import React from 'react';
import './index.css';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import history from './History';

import Layout from './containers/Layout';
import Dashboard from './containers/Dashboard';
import Snapshot from './containers/Snapshot';
import SnapshotDetail from './containers/SnapshotDetail';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <HashRouter history={history}>
        <div >
          <Layout>
            <div>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/:distribution/dashboard" component={Dashboard} />
                <Route exact path="/:distribution/snapshots" component={Snapshot} />
                <Route exact path="/:distribution/snapshot/:name" component={SnapshotDetail} />
              </Switch>
            </div>
          </Layout>
        </div>
      </HashRouter>

    );
  }
}
