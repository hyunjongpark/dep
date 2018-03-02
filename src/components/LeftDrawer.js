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
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { spacing, typography } from 'material-ui/styles';
import { white, blue600 } from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

const LeftDrawer = (props) => {
  const { navDrawerOpen, distributionName } = props;
  const styles = {
    logo: {
      fontSize: 30,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 20,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer
      docked
      open={navDrawerOpen}
    >
      <div style={styles.logo}>
        dep-devops
      </div>
      <div>
        <MenuItem style={styles.menuItem} primaryText='dashboard' leftIcon={<Assessment />}
          containerElement={<Link to={'/' + distributionName + '/dashboard'} />} />
        <MenuItem style={styles.menuItem} primaryText='snapshot' leftIcon={<GridOn />}
          containerElement={<Link to={'/' + distributionName + '/snapshots'} />} />
      </div>
    </Drawer >
  );
};
LeftDrawer.propTypes = {
  username: PropTypes.string.isRequired,
  navDrawerOpen: PropTypes.bool.isRequired
};

LeftDrawer.defaultProps = {
  username: 'admin',
  navDrawerOpen: true
};

export default connect(
  (state) => ({
    distributionName: state.distribution.get('name'),
    pender: state.pender
  })
)(LeftDrawer);
