import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import StaffSearchResult from '../../components/StaffSearchResult';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searching: true,
    };
  }

  getTeachers() {
    callApi('/allTeachers')
      .then(data => this.setState({ searchResults: data.teachers, searching: false }))
      .catch(err => this.props.dispatch(showError('Error Loading TeacherList')));
  }
  componentWillMount() {
    this.getTeachers();
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <StaffSearchResult data={this.state.searchResults} searching={this.state.searching} />
        </Card>
      </div>
    );
  }
}

export default connect()(EmployeeList);
