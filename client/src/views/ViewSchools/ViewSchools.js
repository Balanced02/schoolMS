import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import SchoolSearchResult from '../../components/SchoolSearchResult';

class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searching: true,
    };
  }

  getSchools() {
    callApi('/getSchools')
      .then(data => this.setState({ searchResults: data, searching: false }))
      .catch(err => this.props.dispatch(showError('Error Loading TeacherList')));
  }
  componentWillMount() {
    this.getSchools();
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <SchoolSearchResult data={this.state.searchResults} searching={this.state.searching} />
        </Card>
      </div>
    );
  }
}

export default connect()(SchoolList);
