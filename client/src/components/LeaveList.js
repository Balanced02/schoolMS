import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callApi } from '../utils';
import { showError, showInfo } from '../actions/feedback';
import LeaveModal from './LeaveModal';

import { CardHeader, Table, Card, CardBlock, Badge } from 'reactstrap';

class LeaveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searching: true,
        searchResults: [],
      },
      modalOpen: false,
      leave: {},
    };
  }

  getApplications() {
    let id = this.props.userId || 'admin';
    callApi(`/allLeave/${id}`)
      .then(apps => {
        this.setState({
          data: {
            ...this.state.applications,
            searching: false,
            searchResults: apps,
          },
        });
      })
      .catch(err => this.props.dispatch(showError('Error getting applications')));
  }

  componentWillMount() {
    this.getApplications();
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  select(leave) {
    this.setState({
      leave: {
        ...leave,
      },
    });
    this.toggle();
  }

  render() {
    let { data, leaveCategory, leave, modalOpen } = this.state;
    return (
      <div>
        <Card>
          <CardHeader>Previous Applications</CardHeader>
          <CardBlock>
            <Table responsive striped hover bordered>
              <thead>
                <tr>
                  <th>S/No.</th>
                  <th>Category</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {data.searching ? (
                  <tr>
                    <td />
                    <td>
                      <i
                        className="fa fa-spinner fa-spin fa-2x"
                        style={{ flex: 1, textAlign: 'center' }}
                      />
                    </td>
                  </tr>
                ) : !data.searching && !data.searchResults.length ? (
                  <h4 style={{ textAlign: 'center', marginTop: 20 }}>
                    No Previous Applications Found
                  </h4>
                ) : (
                  data.searchResults.map((leave, i) => (
                    <tr key={i}>
                      <td> {i + 1} </td>
                      <td> {leave.category} </td>
                      <td> {leave.startDate} </td>
                      <td> {leave.endDate} </td>
                      <td>
                        {' '}
                        <Badge color={leave.status === 'approved' ? 'success' : 'danger'} pill>
                          {leave.status.toUpperCase()}
                        </Badge>{' '}
                        {' '}
                      </td>
                      <td>
                        {' '}
                        <i
                          className="fa fa-eye"
                          style={{ color: 'green', cursor: 'pointer' }}
                          onClick={() => this.select(leave)}
                        />{' '}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </CardBlock>
          <LeaveModal isOpen={modalOpen} type={'view'} data={leave} toggle={() => this.toggle()} />
        </Card>
      </div>
    );
  }
}

export default connect()(LeaveList);
