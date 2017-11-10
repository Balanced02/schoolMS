import React, { Component } from 'react';
import { Card, Button, CardBlock } from 'reactstrap';
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

import LeaveModal from '../../components/LeaveModal';
import LeaveList from '../../components/LeaveList';

class LeaveApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.userType ? this.props.user : this.props.user._doc,
      leave: { category: '', startDate: '', endDate: '' },
      minDate: '',
      modalOpen: false,
      leaveCategory: [],
    };
  }

  handleInputchange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      leave: {
        ...this.state.leave,
        [name]: value,
      },
    });
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  submit() {
    let { category, startDate, endDate } = this.state.leave;
    let check = [category, startDate, endDate].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Please fill appropriately'));
    } else {
      let leaveObj = {
        ...this.state.leave,
        teacherId: this.state.user.sid,
      };
      callApi('/leaveApplication', leaveObj, 'POST')
        .then(data => {
          this.setState({
            leave: { category: '', startDate: '', endDate: '' },
            modalOpen: false,
          });
          this.props.dispatch(showInfo('Application Successful'));
        })
        .catch(err => this.props.dispatch(showError('Error applying')));
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

  componentWillMount() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    this.setState({
      minDate: today,
    });
    this.getLeaveCategory();
  }

  render() {
    const { modalOpen, leave, minDate, applications, user, leaveCategory } = this.state;
    return (
      <div className="animated fadeIn container">
        <Card>
          <Button color="link" onClick={() => this.toggle()}>
            {' '}
            New Application{' '}
          </Button>
          <CardBlock>
            <LeaveList userId={user.sid} />
          </CardBlock>
        </Card>
        <LeaveModal
          isOpen={modalOpen}
          category={leaveCategory}
          data={leave}
          minDate={minDate}
          submit={() => this.submit()}
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

export default connect(mapStateToProps)(LeaveApplication);
