import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Row, Card } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

class SDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card style={{ padding: 15 }}>
          <Row />
        </Card>
      </div>
    );
  }
}

export default connect()(SDashboard);
