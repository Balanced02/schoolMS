import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'reactstrap';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import VisitorsList from '../../components/VisitorsList';
import NewVisitor from '../../components/NewVisitor';

class Visitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      visitors: [],
      modalOpen: false,
      visitor: {},
      count: 0,
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  confirm() {
    callApi('/newVisitor', this.state.visitor, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Succesful'));
        this.getVisitors();
        this.toggleModal();
      })
      .catch(err => this.props.dispatch(showInfo('Error')));
  }

  update(e) {
    let { name, value } = e.target;
    this.setState({
      visitor: {
        ...this.state.visitor,
        [name]: value,
      },
    });
  }

  getVisitors() {
    callApi('/allVisitors')
      .then(result =>
        this.setState({ visitors: result.visitors, searching: false, count: result.count })
      )
      .catch(err => this.props.dispatch(showError('Error fetching Visitor List')));
  }

  componentWillMount() {
    this.getVisitors();
  }

  render() {
    return (
      <Card className="container">
        <Button color="link" onClick={() => this.toggleModal()}>
          New Visitor
        </Button>
        {this.state.visitors.length ? (
          <VisitorsList visitors={this.state.visitors} />
        ) : (
          <h4 style={{ textAlign: 'center', fontSize: 30, margin: 20 }}>No Visitors Yet</h4>
        )}
        {this.state.modalOpen ? (
          <NewVisitor
            data={this.state.visitor}
            open={this.state.modalOpen}
            confirm={() => this.confirm()}
            toggle={() => this.toggleModal()}
            edit={e => this.update(e)}
          />
        ) : (
          ''
        )}
      </Card>
    );
  }
}

export default connect()(Visitor);
