import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import StudentSearchResult from '../../components/StudentSearchResult';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searching: true,
    };
  }

  getStudents() {
    callApi('/allTeachers')
      .then(data => this.setState({ searchResults: data.teachers, searching: false }))
      .catch(err => this.props.dispatch(showError('Error Loading Students')));
  }
  componentWillMount() {
   // this.getStudents();
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <StudentSearchResult data={this.state.searchResults} searching={this.state.searching} />
        </Card>
      </div>
    );
  }
}

export default connect()(StudentList);
