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
import { grey800, grey400 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import { relative } from 'path';
import { red100 } from 'material-ui/styles/colors';
import { red50 } from 'material-ui/styles/colors';
import { yellow100 } from 'material-ui/styles/colors';

export default class ServiceBox extends React.Component {
  render() {
    const { color, title, version, Icon } = this.props;

    const styles = {
      paper: {
        position: 'relative',
        outlineStyle: 'ridge',
        outlineWidth: 1,
        fontWeight: typography.textDarkBlack,
        color: grey400,
        padding: 5,
        marginBottom: 30
      },
      content: {
        padding: '5px 10px 5px 10px',
        marginLeft: 10,
        height: 110,
       },
      title: {
        fontSize: 25,
        fontWeight: typography.fontWeightNormal,
        color: grey800,
        display: 'block',
        // marginTop: ,
        height:80,
        width: '70%'
      },
      version: {
        position: 'absolute',
        top: '80px',
        left: '25px',
        fontSize: 12,
        fontWeight: typography.fontWeightNormal,
        color: grey400,
      },
      iconSpan: {
        position: 'relative',
        float: 'right',
        textAlign: 'center',
      },
      icon: {
        height: 90,
        width: 90
      },
      ex: {
        position: 'absolute',
        top: '30px',
        left: '30px',
        fontSize: 25,
        color: grey800,

      },
      label: {
        position: 'absolute',
        background: yellow100,
        width: 60,
        height: 20,
        top: '90px',
        left: '15px',
        fontSize: 12,
        color: grey800,
      },
    };

    return (
      <div style={styles.paper}>
        <div style={styles.iconSpan}>
          <Icon color={color}
            style={styles.icon}
          />
          <div style={styles.ex}>1/1</div>
          <div style={styles.label}>NDEP</div>
        </div>
        <div style={styles.content}>
          <span style={styles.title}>{title.length < 16 ? title : title.substring(0, 13) + '...'}</span>
          <h4 style={styles.version}>Version {version.length < 8 ? version : version.substring(0, 5) + '...'}</h4>
        </div>
      </div>
    );
  }
}


ServiceBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any
};
