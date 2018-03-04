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
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import { white } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as distributionActions from '../modules/distribution';
import Data from '../data'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount() {
    //TODO: it is operation only once after the login feature is added.
    this.updateDistributionList()
  }

  updateDistributionList() {
    const { distributionActions } = this.props;
    distributionActions.getDistributionList();
  }

  changeNavDrawer(e) {
    if (this.props.handleChangeRequestNavDrawer) {
      this.props.handleChangeRequestNavDrawer();
    }
  }


  handleChangeDistribution = (event, value) => {
    const { distributionActions } = this.props;
    distributionActions.setDistributionName(value);
    Data.distributionName = value;
    return <Link to='/' />;    
  };

  render() {
    const { distributionName, distributionList } = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
      <div>
        <AppBar
          style={this.props.styles}
          title={distributionName}
          iconElementLeft={
            <IconButton style={style.menuButton} onClick={e => this.changeNavDrawer(e)}>
              <Menu color={white} />
            </IconButton>
          }

          iconElementRight={
            <div style={style.iconsRightContainer}>

              <IconMenu
                color={white}
                iconButtonElement={<IconButton><ViewModule color={white} /></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                onChange={this.handleChangeDistribution}
                value={distributionName}
              // onClick={() => this.updateDistributionList()}
              >

                {Array.isArray(distributionList) && distributionList.map((item, i) => {
                  return (<MenuItem key={i} value={item.name} primaryText={item.name} />)
                })}

              </IconMenu>

              {/* <IconMenu
                color={white}
                iconButtonElement={
                  <IconButton><MoreVertIcon color={white} /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="login" />
              </IconMenu> */}
            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  handleChangeRequestNavDrawer: PropTypes.func.isRequired
};

Header.defaultProps = {
  handleChangeRequestNavDrawer: null
};

export default connect(
  (state) => ({
    distributionName: state.distribution.get('name'),
    distributionList: state.distribution.get('list'),
    pender: state.pender
  }),
  (dispatch) => ({
    distributionActions: bindActionCreators(distributionActions, dispatch),
  })
)(Header);
