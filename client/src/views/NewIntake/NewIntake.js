import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  Button,
  CardHeader,
  CardBlock,
} from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import StudentDetails from '../../components/StudentDetails';

class NewIntake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      academicYear: {
        searching: true,
        searchResults: [],
      },
      studentInfo: {
        username: '',
        className: '',
        surName: '',
        otherNames: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        address: '',
        phone: '',
        pName: '',
        pOccupation: '',
        pPhoneNumber: '',
        pOfficeAddress: '',
        pAddress: '',
      },
      classes: {
        searchResults: [],
        searching: true,
      },
    };
  }

  edit(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      studentInfo: {
        ...this.state.studentInfo,
        [name]: value,
      },
    });
  }

  submit() {
    let check = Object.values(this.state.studentInfo);
    check = check.every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('All fields must be filled'));
    } else {
      this.props.dispatch(showInfo('Generating Admission Number...'));
<<<<<<< HEAD
      this.newIntake();
=======
      // this.newIntake();
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    }
  }

  newIntake() {
    callApi('/auth/register', { ...this.state }, 'POST')
      .then(student => {
        this.props.dispatch(showInfo('Created Successfully'));
        this.setState(this.initialState);
      })
      .catch(err => this.props.dispatch(showError(err)));
  }

  getAcademicYear() {
    callApi('/getAcademicDetails')
      .then(data => {
        this.setState({
          academicYear: {
            searchResults: data,
            searching: false,
          },
        });
      })
      .catch(err => this.props.dispatch(showError('Error fetching Academic Details')));
  }

  getClassList() {
    callApi('/allClass')
      .then(data =>
        this.setState({
          classes: {
            searchResults: data.data,
            searching: false,
          },
        })
      )
      .catch(err => this.props.dispatch(showError('Error Loading Class List')));
  }

  componentWillMount() {
    this.getAcademicYear();
    this.getClassList();
    this.initialState = this.state;
  }

  render() {
    const { classes, studentInfo } = this.state;
    return (
      <div className="container">
        <Card className="container" style={{ padding: 10 }}>
          <Card>
            <CardHeader>Official Details</CardHeader>
            <CardBlock>
              <FormGroup row>
                <Label md={2}>Academic Year</Label>
                <Col md={4}>
                  <Input type="select" name="academicYear" onChange={e => this.edit(e)}>
                    <option value="1" disabled selected>
                      Select Academic Year
                    </option>
                    {this.state.academicYear.searching ? (
                      <option>
                        {' '}
                        <i className="fa fa-spinner fa-spin" />{' '}
                      </option>
                    ) : !this.state.academicYear.searching &&
                    !this.state.academicYear.searchResults ? (
                      <i />
                    ) : (
                      this.state.academicYear.searchResults.map(data => (
                        <option value={data.sid}>
                          {' '}
                          {moment(data.startYear).format('MMM YYYY') +
                            '/' +
                            moment(data.endYear).format('MMM YYYY')}{' '}
                        </option>
                      ))
                    )}
                  </Input>
                </Col>
                <Label md={2}>Joining Date</Label>
                <Col md={4}>
                  <Input type="date" name="joiningDate" onChange={e => this.edit(e)} />
                </Col>
              </FormGroup>
            </CardBlock>
            <StudentDetails
              data={studentInfo}
              classes={classes}
              edit={e => this.edit(e)}
              submit={() => this.submit()}
            />
          </Card>
        </Card>
      </div>
    );
  }
}

export default connect()(NewIntake);
