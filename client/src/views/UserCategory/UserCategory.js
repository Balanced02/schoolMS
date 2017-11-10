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
import UserList from '../../components/UserList';

class UserCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true,
      },
      userCategory: {},
    };
  }

  addUserCategory() {
    if (this.state.userCategory.category === '' || this.state.userCategory.salary === '') {
      this.props.dispatch(showError('Please fill correctly'));
    } else {
      callApi('/addUserCategory', this.state.userCategory, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Added!!!'));
          this.getUserCategory();
          this.setState({
            userCategory: {},
          });
        })
        .catch(err => this.props.dispatch(showError('Error Adding User Category')));
    }
  }

  getUserCategory() {
    callApi('/getUserCategory')
      .then(data => {
        this.setState({
          data: {
            searchResults: data,
            searching: false,
          },
        });
      })
      .catch(err => this.props.dispatch(showError('Error fetching user categories')));
  }

  componentWillMount() {
    this.getUserCategory();
  }

  select(data) {
    this.setState({
      userCategory: {
        ...data,
      },
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      userCategory: {
        ...this.state.userCategory,
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
              <Col md={6}>
                <Card>
                  <CardHeader>Add User Category</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>User Category</Label>
                      <Input
                        type="text"
                        name="category"
                        value={this.state.userCategory.category || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Salary</Label>
                      <Input
                        type="number"
                        name="salary"
                        value={this.state.userCategory.salary || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <Button onClick={() => this.addUserCategory()}>
                      {this.state.userCategory._id ? 'Update' : 'Save'}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col md={6}>
                <UserList data={this.state.data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(UserCategory);
