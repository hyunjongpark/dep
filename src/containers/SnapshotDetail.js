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
import Divider from 'material-ui/Divider';
import request from 'superagent';
import PageBase from '../components/PageBase';
import SnapshotDetailSummary from '../components/snapshot/SnapshotDetailSummary'
import SnapshotDetailServiceList from '../components/snapshot/SnapshotDetailServiceList';
import { connect } from 'react-redux';
import Data from '../data';

class SnapshotDetail extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.match
    this.state = {
      snapshotName: params.name,
      name: params.name,
      parentSnapshotName: '',
      status: '',
      tag: '',
      user: '',
      createTime: '',
      updatedServices: [],
      services: []
    };
  }

  componentWillMount() {
    this.loadSnapshotDetailInfo()
  }

  loadSnapshotDetailInfo() {
    const { distributionName } = this.props;
    request
      .get(`${Data.restAPIUrl}/distributions/${distributionName}/snapshots/${this.state.snapshotName}`)
      .end((err, res) => {
        if (err || res.body === null) {
          return
        }

        // TODO: add exception handling, simplify data structure
        this.setState({
          user: res.body.user !== null ? res.body.user : 'none',
          parentSnapshotName: res.body.parentSnapshotName !== null ? res.body.parentSnapshotName : 'none',
          status: res.body.status !== null ? res.body.status : 'none',
          tag: res.body.tag !== null ? res.body.tag : 'none',
          createTime: res.body.createTime !== null ? res.body.createTime : 'none',
          updatedServices: res.body.updatedServices !== null ? res.body.updatedServices : [],
          services: res.body.services !== null ? res.body.services : [],
        })
      })
  }

  render() {
    return (
      <PageBase
        navigation="Snapshot / detail"
        title=" Snapshot Detail Info"
      >
        <div>
          <div>
            <p>Summary</p>
            <Divider />
            <SnapshotDetailSummary
              user={this.state.user}
              createTime={this.state.createTime}
              snapshotName={this.state.snapshotName}
              updatedServices={this.state.updatedServices}
              parentSnapshotName={this.state.parentSnapshotName}
              status={this.state.status}
              tag={this.state.tag}
            />
            <Divider />
            <p>Total Services List</p>
            <SnapshotDetailServiceList services={this.state.services} />
          </div>
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
)(SnapshotDetail);