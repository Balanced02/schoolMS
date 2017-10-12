import React, { Component } from 'react';
import { Card } from 'reactstrap';
import StaffSearchResult from '../../components/StaffSearchResult';

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <StaffSearchResult />
        </Card>
      </div>
    );
  }
}

export default Staff;
