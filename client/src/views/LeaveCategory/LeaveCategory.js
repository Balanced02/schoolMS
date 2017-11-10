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
import CategoryList from '../../components/CategoryList';

class LeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true,
      },
      leaveCategory: {},
    };
  }

  addLeaveCategory() {
    if (this.state.leaveCategory.category === '') {
      this.props.dispatch(showError('Please fill correctly'));
    } else {
      callApi('/addLeaveCategory', this.state.leaveCategory, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Added!!!'));
          this.getLeaveCategory();
          this.setState({
            leaveCategory: {},
          });
        })
        .catch(err => this.props.dispatch(showError('Error Adding Leave Category')));
    }
  }

  getLeaveCategory() {
    callApi('/getLeaveCategory')
      .then(data => {
        this.setState({
          data: {
            searchResults: data,
            searching: false,
          },
        });
      })
      .catch(err => this.props.dispatch(showError('Error fetching leave categories')));
  }

  componentWillMount() {
    this.getLeaveCategory();
  }

  select(data) {
    this.setState({
      leaveCategory: {
        ...data,
      },
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      leaveCategory: {
        ...this.state.leaveCategory,
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
                  <CardHeader>Add Leave Category</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>Leave Category</Label>
                      <Input
                        type="text"
                        name="category"
                        value={this.state.leaveCategory.category || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <Button onClick={() => this.addLeaveCategory()}>
                      {this.state.leaveCategory._id ? 'Update' : 'Save'}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col md={6}>
                <CategoryList data={this.state.data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(LeaveCategory);
