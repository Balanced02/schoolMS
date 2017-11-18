import React, { Component } from 'react';
import { Card, CardBlock, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import InstitutionDetail from '../../components/InstitutionDetail';
import StaffDetails from '../../components/StaffDetails';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.userType ? this.props.user : this.props.user._doc,
      profile: {},
      school: {},
      hidden: true,
      imageUrl: '',
    };
  }

  getUserDetails() {
    console.log(this.state.user.userType);
    callApi(`/getUserDetails`, this.state.user, 'POST')
      .then(data => {
        this.setState({ profile: data.userData, school: data.schoolData });
        this.getImageUrl(data.schoolData.logo);
      })
      .catch(err => this.props.dispatch(showError('Error Loading User Data')));
  }

  updateDetails() {
    let {
      phoneNumber,
      fullName,
      email,
      dob,
      gender,
      address,
      pName,
      pPhoneNumber,
      pOccupation,
      pEmail,
      pAddress,
    } = this.state.profile;
    let check = [
      phoneNumber,
      fullName,
      email,
      dob,
      gender,
      address,
      pName,
      pPhoneNumber,
      pOccupation,
      pEmail,
      pAddress,
    ].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Fields with * are compulsory'));
    } else {
      this.props.dispatch(showInfo('Updating Details'));
      callApi('/updateUserDetails', this.state.profile, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Updated'));
          this.getUserDetails();
        })
        .catch(err => this.props.dispatch(showError('Error Updating Details')));
    }
  }

  getImageUrl(path) {
    callApi('/getImageUrl', { logo: path }, 'POST')
      .then(link =>
        this.setState({
          imageUrl: link,
          hidden: false,
        })
      )
      .catch(err => {
        this.setState({
          imageUrl: '',
          hidden: false,
        });
        this.props.dispatch(showError('Error getting image link'));
      });
  }

  handleInputchange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      profile: {
        ...this.state.profile,
        [name]: value,
      },
    });
  }

  componentWillMount() {
    this.getUserDetails();
  }

  render() {
    const { imageUrl, school, hidden } = this.state;
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardBlock>
            <Card className="container" style={{ padding: 10 }}>
              <CardHeader>Institution Details</CardHeader>
              <CardBlock>
                <InstitutionDetail data={school} uploading={hidden} image={imageUrl} />
              </CardBlock>
            </Card>
          </CardBlock>
          <CardBlock>
            <StaffDetails
              submit={() => this.updateDetails()}
              data={this.state.profile}
              editType="user"
              edit={e => this.handleInputchange(e)}
              headerText={'Personal Details'}
            />
          </CardBlock>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user || {},
  };
};

export default connect(mapStateToProps)(Profile);
