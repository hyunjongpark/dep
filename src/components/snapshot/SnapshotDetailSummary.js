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
import PropTypes from 'prop-types';
import { typography } from 'material-ui/styles';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionGetApp from 'material-ui/svg-icons/action/get-app';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';

export default class SnapshotDetailSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const styles = {
            title: {
                fontWeight: typography.fontWeightLight,
                fontSize: 14,
            },
          

            stitle: {
                marginTop:10,
            }, 

            text1: {
                valing: 'middle',
            },
            
            content: {
                fontSize: 14,
                color: 'DarkGray'
            },
            updateServices: {
                fontSize: 14,
                color: 'SlateBlue '
            }
        };

        return (
            <div >
                <div style={styles.stitle}>
                    <span style={styles.flex}>
                        <ActionAccountCircle />
                        <span> {this.props.user} </span>
                    </span>
                    
                    <span >
                        <ActionSchedule />
                        <span>{this.props.createTime}</span>
                    </span>
                    <span c>
                        <ActionGetApp />
                        <span> {this.props.updatedServices.length} updated services</span>
                    </span>
                </div>
                <div>
                    <ul>
                        {/* // TODO: refactoring repeat operation */}
                        <li ><code style={styles.title}>snapshot name: </code><code style={styles.content}>{this.props.snapshotName}</code></li>
                        <li><code style={styles.title}>updated services:</code></li>
                        <ul>
                            {this.props.updatedServices.map((item, i) => {
                                return (<li key={i} ><code style={styles.updateServices}>{item}</code></li>);
                            })}
                        </ul>
                        <li ><code style={styles.title}>parent snapshot name: </code><code style={styles.content}>{this.props.parentSnapshotName}</code></li>
                        <li ><code style={styles.title}>status: </code><code style={styles.content}>{this.props.status}</code></li>
                        <li ><code style={styles.title}>tag: </code><code style={styles.content}>{this.props.tag}</code></li>
                    </ul>
                </div>
            </div>
        );
    }
};

SnapshotDetailSummary.propTypes = {
    user: PropTypes.string.isRequired,
    createTime: PropTypes.string.isRequired,
    updatedServices: PropTypes.array.isRequired,
    parentSnapshotName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
};
SnapshotDetailSummary.defaultProps = {
    user: 'temp_user',
    createTime: 'none',
    updatedServices: [],
    parentSnapshotName: 'none',
    status: 'unstable',
    tag: 'none'
};