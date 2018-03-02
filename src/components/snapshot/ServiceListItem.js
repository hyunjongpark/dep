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
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { typography } from 'material-ui/styles';

export default class ServiceListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const styles = {
            list: {
                paddingTop: 20,
                paddingBottom: 20,
            },
            title: {
                fontWeight: typography.fontWeightLight,
                fontSize: 15,
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
            <Paper>
                {/* // TODO: refactoring repeat operation */}
                <ul style={styles.list}>
                    <li ><code style={styles.title}>name: </code><code style={styles.content}>{this.props.content.name}</code></li>
                    <li ><code style={styles.title}>version: </code><code style={styles.content}>{this.props.content.version}</code></li>
                    <li ><code style={styles.title}>deploy type: </code><code style={styles.content}>{this.props.content.deployType}</code></li>
                    <li ><code style={styles.title}>deploy file name: </code><code style={styles.content}>{this.props.content.deployFileName}</code></li>
                    <li ><code style={styles.title}>deploy jenkins file name: </code><code style={styles.content}>{this.props.content.deployJenkinsFileName}</code></li>
                    <li ><code style={styles.title}>environment variable file name: </code><code style={styles.content}>{this.props.content.environmentVariableFileName}</code></li>
                    <li ><code style={styles.title}>automated test file name: </code><code style={styles.content}>{this.props.content.automatedTestFileName}</code></li>
                    <li ><code style={styles.title}>automated test framework: </code><code style={styles.content}>{this.props.content.automatedTestFramework}</code></li>
                    <li ><code style={styles.title}>dependencies: </code></li>
                    <li ><code style={styles.title}>artifacts: </code></li>
                </ul>
                <p />
            </Paper>
        );
    }
};

ServiceListItem.propTypes = {
    content: PropTypes.object.isRequired
};
ServiceListItem.defaultProps = {
    content: null
};