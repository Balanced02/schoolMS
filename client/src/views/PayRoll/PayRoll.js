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
  FormText,
} from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import PayRollDetails from '../../components/PayRollDetails';

class PayRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true,
      },
      payRollDetails: {},
    };
  }

  addpayRollDetails() {
    const { payRollDetails } = this.state;
    if (!payRollDetails.payHeadType || !payRollDetails.percentage || !payRollDetails.method) {
      this.props.dispatch(showError('Please fill correctly'));
    } else {
      callApi('/addPayRollDetails', payRollDetails, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Added!!!'));
          this.getpayRollDetails();
          this.setState({
            payRollDetails: {},
          });
        })
        .catch(err => this.props.dispatch(showError('Error Adding User Category')));
    }
  }

  getpayRollDetails() {
    callApi('/getPayRollDetails')
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
    this.getpayRollDetails();
  }

  select(data) {
    this.setState({
      payRollDetails: {
        ...data,
      },
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      payRollDetails: {
        ...this.state.payRollDetails,
        [name]: value,
      },
    });
  }

  render() {
    const { payRollDetails, data } = this.state;
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardBlock>
            <Row>
              <Col md={5}>
                <Card>
                  <CardHeader>Add Pay Head Type</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>Pay Head Type</Label>
                      <Input
                        type="text"
                        name="payHeadType"
                        value={payRollDetails.payHeadType || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                      <FormText color="muted">E.g. Transport Allowance</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label>Percentage of Basic Salary</Label>
                      <Input
                        type="number"
                        name="percentage"
                        value={payRollDetails.percentage || ''}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Method</Label>
                      <Input
                        type="select"
                        name="method"
                        value={payRollDetails.method || ''}
                        onChange={e => this.handleInputChange(e)}
                      >
                        <option selected disabled>
                          Select
                        </option>
                        <option value="addition">Addition</option>
                        <option value="deduction">Deduction</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <Button onClick={() => this.addpayRollDetails()}>
                      {payRollDetails._id ? 'Update' : 'Save'}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col md={7}>
                <PayRollDetails data={data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(PayRoll);
