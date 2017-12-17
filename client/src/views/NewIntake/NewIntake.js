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
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import StudentDetails from '../../components/StudentDetails';
import moment from 'moment';

class NewIntake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      academicYear: {
        searching: true,
        searchResults: [],
      },
      studentInfo: {},
      classes: [],
    };
  }

  componentWillMount() {
    this.initialState = this.state;
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
      this.newIntake();
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
        console.log(data);
        this.setState({
          academicYear: {
            searchResults: data,
            searching: false,
          },
        });
      })
      .catch(err => this.props.dispatch(showError('Error fetching Academic Details')));
  }

  componentWillMount() {
    this.getAcademicYear();
  }

  render() {
    const { classes } = this.state;
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
                      <option value="Male">
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
              data={this.state.studentInfo}
              classes={this.state.classes}
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
