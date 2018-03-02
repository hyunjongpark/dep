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
import { typography } from 'material-ui/styles';
import { grey600 } from 'material-ui/styles/colors';

const PageBase = (props) => {
  const { navigation, children } = props;
  const styles = {
    navigation: {
      fontSize: 15,
      fontWeight: typography.fontWeightLight,
      color: grey600,
      paddingBottom: 10,
      paddingLeft: 15,
      display: 'block'
    },
    paper: {
      padding: 10
    },
    clear: {
      clear: 'both'
    }
  };

  return (
    <div>
      <span style={styles.navigation}>{navigation}</span>
      <Paper style={styles.paper}>
        {children}
        <div style={styles.clear} />
      </Paper>
    </div>
  );
};

PageBase.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};

PageBase.defaultProps = {
  title: 'base page',
  navigation: '/',
  children: null
};

export default PageBase;
