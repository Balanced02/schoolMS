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
import LibraryCategoryList from '../../components/LibraryCategoryList';

class LeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true,
      },
      libraryCategory: {},
    };
  }

  addLibraryCategory() {
    if (!this.state.libraryCategory.category || !this.state.libraryCategory.sectionCode) {
      this.props.dispatch(showError('Please fill correctly'));
    } else {
      callApi('/addLibraryCategory', this.state.libraryCategory, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Added!!!'));
          this.getLibraryCategory();
          this.setState({
            libraryCategory: {},
          });
        })
        .catch(err => this.props.dispatch(showError('Error Adding Leave Category')));
    }
  }

  getLibraryCategory() {
    callApi('/getLibraryCategory')
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
    this.getLibraryCategory();
  }

  select(data) {
    this.setState({
      libraryCategory: {
        ...data,
      },
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      libraryCategory: {
        ...this.state.libraryCategory,
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
                  <CardHeader>Add Category</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>Book Category</Label>
                      <Input
                        type="text"
                        name="category"
                        value={this.state.libraryCategory.category || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Section Code</Label>
                      <Input
                        type="text"
                        name="sectionCode"
                        value={this.state.libraryCategory.sectionCode || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <Button onClick={() => this.addLibraryCategory()}>
                      {this.state.libraryCategory._id ? 'Update' : 'Save'}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <LibraryCategoryList data={this.state.data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(LeaveCategory);
