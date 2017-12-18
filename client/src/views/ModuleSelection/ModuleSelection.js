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

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import ModuleList from '../../components/ModuleList';

class ModuleSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {
        searchResults: [],
        searching: true,
      },
      school: {
        schoolId: '',
        module: '',
      },
    };
  }

  getSchoolList() {
    callApi('/getSchools')
      .then(data =>
        this.setState({
          data: {
            searchResults: data.schools,
            searching: false,
          },
        })
      )
      .catch(err => this.props.dispatch(showError('Error Loading School List')));
  }

  componentWillMount() {
    this.getSchoolList();
  }

  select(data) {
    this.setState({
      school: {
        schoolId: data.schoolId,
        module: data.module,
      },
    });
  }

  updateSchool() {
    this.setState({
      loading: true,
    });
    let check = Object.values(this.state.school);
    check = check.every(data => data !== '');
    if (!check) {
      this.setState({
        loading: false,
      });
      this.props.dispatch(showError('All fields must be filled'));
    } else {
      callApi('/updateUserModule', this.state.school, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Updated'));
          this.setState({
            loading: false,
            school: {
              schoolId: '',
              module: '',
            },
          });
          this.getSchoolList();
        })
        .catch(err => {
          this.setState({
            loading: false,
          });
          this.props.dispatch(showError('Error Updating Module'));
        });
    }
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      school: {
        ...this.state.school,
        [name]: value,
      },
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardBlock>
            <Row>
              <Col md={5}>
                <Card>
                  <CardHeader>Module Update</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>School ID</Label>
                      <Input
                        type="text"
                        name="schoolId"
                        value={this.state.school.schoolId || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>User Type</Label>
                      <Input type="select" name="module" onChange={e => this.handleInputChange(e)}>
                        <option selected disabled>
                          Select
                        </option>
                        <option value="bronze" selected={this.state.school.module === 'bronze'}>
                          {' '}
                          Bronze{' '}
                        </option>
                        <option value="silver" selected={this.state.school.module === 'silver'}>
                          {' '}
                          Silver{' '}
                        </option>
                        <option value="gold" selected={this.state.school.module === 'gold'}>
                          {' '}
                          Gold{' '}
                        </option>
                      </Input>
                    </FormGroup>
                    <Button onClick={() => this.updateSchool()}>
                      Update {loading ? <i className="fa fa-2x fa-spinner fa-spin" /> : <i />}{' '}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col md={7}>
                <ModuleList data={this.state.data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(ModuleSelection);
