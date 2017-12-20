import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import ParentSearchResult from '../../components/ParentSearchResult';

class ParentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searching: true,
    };
  }

  getParents() {
    callApi('/allParents')
      .then(data => this.setState({ searchResults: data.parents, searching: false }))
      .catch(err => this.props.dispatch(showError('Error Loading Parents List')));
  }
  componentWillMount() {
    this.getParents();
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <ParentSearchResult data={this.state.searchResults} searching={this.state.searching} />
        </Card>
      </div>
    );
  }
}

export default connect()(ParentList);
