import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  Button,
  CardBlock,
  CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import StaffDetails from '../../components/StaffDetails';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fullName: '',
        username: '',
        email: '',
        userType: '',
        address: '',
        password: '',
        phoneNumber: '',
        password2: '',
        dob: '',
        gender: '',
      },
    };
  }

  componentWillMount() {
    this.initialState = this.state;
  }

  handleInputchange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  }

  addNewStaff() {
    let filled = Object.values(this.state.data).every(val => val !== '');
    if (filled) {
      if (this.state.data.password !== this.state.data.password2) {
        this.props.dispatch(showError('Passwords do not match'));
        return;
      } else {
        callApi('/auth/register', { ...this.state }, 'POST')
          .then(staff => {
            this.props.dispatch(showInfo('Created Successfully'));
            this.setState(this.initialState);
          })
          .catch(err => this.props.dispatch(showError(err)));
      }
    }
    filled
      ? this.props.dispatch(showInfo('Good to go'))
      : this.props.dispatch(showError('Kindly Fill correctly'));
  }

  render() {
    return (
      <div className="container">
        <StaffDetails
          edit={e => this.handleInputchange(e)}
          submit={() => this.addNewStaff()}
          data={this.state.data}
          editType="admin"
          headerText={'Employee Details'}
        />
      </div>
    );
  }
}

export default connect()(Employee);
