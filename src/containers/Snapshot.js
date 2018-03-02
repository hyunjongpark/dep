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
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { grey500 } from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';

import * as snapshotActions from '../modules/snapshot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Snapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '700px',
    };
  }
  componentWillMount() {
    const { snapshotActions } = this.props;
    //TODO: if there is a data set, do not requtest it again.
    snapshotActions.getSnapshotList();
  }

  render() {
    const { snapshotItems, distributionName } = this.props;
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      columns: {
        time: {
          width: '15%'
        },
        user: {
          width: '15%'
        },
        name: {
          width: '25%'
        },
        updatedServices: {
          width: '25%'
        },
        edit: {
          width: '20%'
        }
      }
    };

    return (
      <PageBase
        title="Snapshot"
        navigation="Snapshot"
      >
        <div>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn style={styles.columns.time}>Create Time</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.user}>Create User</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.updatedServices}>Update Services</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Info</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {Array.isArray(snapshotItems) && snapshotItems.map((item, i) => {
                return (<TableRow key={i}>
                  <TableRowColumn style={styles.columns.time}>{item.createTime === undefined ? '' : item.createTime}</TableRowColumn>
                  <TableRowColumn style={styles.columns.user}>{item.user === undefined ? '' : item.user}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item.name === undefined ? '' : item.name}</TableRowColumn>
                  <TableRowColumn style={styles.columns.updatedServices}>{item.updatedServiceList === undefined ? '' : item.updatedServiceList.toString()}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <RaisedButton
                      label="Detail"
                      containerElement={<Link to={'/' + distributionName + '/snapshot/' + item.name} />}
                    />
                  </TableRowColumn>
                </TableRow>);
              })}
            </TableBody>
          </Table>
        </div>
      </PageBase>
    );
  }
}

export default connect(
  (state) => ({
    distributionName: state.distribution.get('name'),
    snapshotItems: state.snapshot,
    pender: state.pender
  }),
  (dispatch) => ({
    snapshotActions: bindActionCreators(snapshotActions, dispatch),
  })
)(Snapshot);
