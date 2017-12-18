import React, { Component } from 'react';
import {
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
  CardBlock,
  CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';

import AcademicYearList from '../../components/AcademicYearList';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

class AcademicYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true,
      },
      academicDetails: { startYear: '', endYear: '', status: '' },
    };
  }

  addAcademicYear() {
    let { startYear, endYear, startMonth, endMonth, status } = this.state.academicDetails;
    let check = [startYear, endYear, startMonth, endMonth, status].every(e => e !== '');
    if (!check) {
      this.props.dispatch(showError('Please fill correctly'));
    } else {
      callApi('/newAcademicYear', this.state.academicDetails, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Added!!!'));
          this.getAcademicYear();
        })
        .catch(err => this.props.dispatch(showError('Error')));
    }
  }

  getAcademicYear() {
    callApi('/getAcademicDetails')
      .then(data => {
        this.setState({
          data: {
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

  select(data) {
    console.log(data);
    this.setState({
      academicDetails: {
        ...data,
      },
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      academicDetails: {
        ...this.state.academicDetails,
        [name]: value,
      },
    });
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardBlock>
            <Row>
              <Col xs="12" md="6">
                <Card>
                  <CardHeader>Add Academic Details</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>Start Month/Year</Label>
                      <Input
                        type="month"
                        name="startYear"
                        value={this.state.academicDetails.startYear}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>End Month/Year</Label>
                      <Input
                        type="month"
                        name="endYear"
                        value={this.state.academicDetails.endYear}
                        min={this.state.academicDetails.startYear}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>End Month/Year</Label>
                      <Input type="select" name="status" onChange={e => this.handleInputChange(e)}>
                        <option selected> Select One </option>
                        <option
                          value="active"
                          selected={this.state.academicDetails.status === 'active'}
                        >
                          Active
                        </option>
                        <option
                          value="inactive"
                          selected={this.state.academicDetails.status === 'inactive'}
                        >
                          Inactive
                        </option>
                      </Input>
                    </FormGroup>

                    <Button onClick={() => this.addAcademicYear()}>
                      {this.state.academicDetails._id ? 'Update' : 'Save'}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <AcademicYearList data={this.state.data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(AcademicYear);
