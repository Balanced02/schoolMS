import React, { Component } from 'react';
import { Card, CardBlock } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

import LeaveApproval from '../../components/LeaveApproval';
import LeaveModal from '../../components/LeaveModal';
import LeaveList from '../../components/LeaveList';

class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: this.props.user.userType ? this.props.user.userType : this.props.user._doc.userType,
      searchResults: [],
      searching: true,
      leave: {},
      leaveCategory: [],
      modalOpen: false,
    };
  }

  handleInputchange(e) {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'status') {
      this.setState({
        leave: {
          ...this.state.leave,
          status: this.state.leave.status === 'pending' ? 'approved' : 'pending',
        },
      });
    } else {
      this.setState({
        leave: {
          ...this.state.leave,
          [name]: value,
        },
      });
    }
  }

  getLeaveCategory() {
    callApi('/getLeaveCategory')
      .then(data => {
        this.setState({
          leaveCategory: data,
        });
      })
      .catch(err => this.props.dispatch(showError('Error fetching leave categories')));
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  getApplications() {
    callApi('/allLeave/admin')
      .then(data =>
        this.setState({
          searchResults: data,
          searching: false,
        })
      )
      .catch(err => this.props.dispatch(showError('Error getting leave applications...')));
  }

  select(data) {
    this.setState({
      leave: {
        ...data,
      },
    });
    this.toggle();
  }

  componentWillMount() {
    this.getApplications();
    this.getLeaveCategory();
  }

  submit() {
    callApi('/updateLeave', this.state.leave, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Updated successfully'));
        this.setState({
          leave: {},
          modalOpen: false,
        });
        this.getApplications();
      })
      .catch(err => this.props.dispatch('Error updating Leave Application'));
  }

  render() {
    const { searching, searchResults, modalOpen, leave, userType, leaveCategory } = this.state;
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardBlock>
            {searching ? (
              <div>
                <i className="fa fa-spinner fa-spin fa-2x" />
              </div>
            ) : !searching && !searchResults.length ? (
              <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
                No Pending Applications Found
              </h4>
            ) : (
              <LeaveApproval data={searchResults} select={data => this.select(data)} />
            )}
          </CardBlock>
          <LeaveList />
        </Card>
        <LeaveModal
          isOpen={modalOpen}
          data={leave}
          category={leaveCategory}
          submit={() => this.submit()}
          userType={userType}
          edit={e => this.handleInputchange(e)}
          toggle={() => this.toggle()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user || {},
  };
};

export default connect(mapStateToProps)(Leave);
