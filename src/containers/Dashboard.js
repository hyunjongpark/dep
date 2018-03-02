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
import request from 'superagent';
import Data from '../data';
import PageBase from '../components/PageBase';
import { green600 } from 'material-ui/styles/colors';
import DeviceDataUsage from 'material-ui/svg-icons/device/data-usage'
import ServiceBox from '../components/dashboard/ServiceBox';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshotName: '',
      services: []
    };
  }

  componentWillMount() {
    this.loadSnapshotList()
  }

  loadSnapshotList() {
    const { distributionName } = this.props;
    // TODO: temporay code
    request
      .get(`${Data.restAPIUrl}/distributions/${distributionName}/snapshots`)
      .end((err, res) => {
        if (err || res.body === null) {
          return
        }
        function custonSort(a, b) {
          if (a.createTime === b.createTime) {
            return 0
          }
          return a.createTime < b.createTime ? 1 : -1;
        }
        res.body.sort(custonSort);
        this.setState({
          snapshotName: res.body[0].name
        })
        request
          .get(`${Data.restAPIUrl}/distributions/${distributionName}/snapshots/${this.state.snapshotName}`)
          .end((err, res) => {
            if (err || res.body === null) {
              return
            }
            this.setState({
              services: res.body.services !== null ? res.body.services : [],
            })
          })
        this.setState({
          snapshotItems: res.body !== null ? res.body : []
        })
      })
  }

  render() {
    return (
      <PageBase
        navigation={"Dashboard / " + this.state.snapshotName}
      >
        <div className='row'>
          {this.state.services.map((item, i) => {
            return (<div key={i} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <ServiceBox Icon={DeviceDataUsage}
                color={green600}
                title={item.name}
                version={item.version}
              />
            </div>);
          })}
        </div>
      </PageBase>
    );
  }
};

export default connect(
  (state) => ({
    distributionName: state.distribution.get('name'),
    pender: state.pender
  })
)(Dashboard);
