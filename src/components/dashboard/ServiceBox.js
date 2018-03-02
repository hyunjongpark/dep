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
import Paper from 'material-ui/Paper';
import { grey800 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';

export default class ServiceBox extends React.Component {

  render() {
    const { color, title, version, Icon } = this.props;

    const styles = {
      paper: {
        outlineStyle: 'solid',
        fontWeight: typography.textDarkBlack,
        color: grey800,
      },
      content: {
        padding: '5px 10px 5px 10px',
        marginLeft: 10,
        height: 80,
      },
      title: {
        fontSize: 25,
        fontWeight: typography.fontWeightNormal,
        color: grey800
      },
      version: {
        fontSize: 12,
        fontWeight: typography.fontWeightNormal,
        marginLeft: 50,
        color: grey800,
      },
      iconSpan: {
        float: 'right',
        textAlign: 'center'
      },
      icon: {
        height: 90,
        width: 90
      }
    };

    return (
      <Paper style={styles.paper}>
        <span style={styles.iconSpan}>
          <Icon color={color}
            style={styles.icon}
          />
        </span>
        <div style={styles.content}>
          <span style={styles.title}>{title}</span>
          <h4 style={styles.version}>Version {version}</h4>
        </div>
      </Paper>
    );
  }
}

ServiceBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any
};
