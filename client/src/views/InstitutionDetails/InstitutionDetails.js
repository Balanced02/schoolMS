import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Row, Card, CardBlock } from 'reactstrap';
import { connect } from 'react-redux';
import Dropbox from 'dropbox';
import upload from 'superagent';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import InstitutionDetail from '../../components/InstitutionDetail';

class InstitutionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        schoolName: '',
        shortCode: '',
        address: '',
        phoneNumber: '',
        country: '',
        password: 'testschooladmin',
        email: '',
        founded: '',
        fullName: '',
        address: '',
        userType: 'school',
        username: '',
        logo: '',
      },
      uploadFile: '',
      uploading: false,
      imageUrl: '',
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    let shortCode = '';
    name === 'shortCode'
      ? (shortCode = value)
      : name === 'schoolName'
        ? (shortCode = this.state.data.schoolName
            ? this.state.data.schoolName
                .split(' ')
                .map(a => a.substring(0, 1).toUpperCase())
                .join('')
            : '')
        : (shortCode = this.state.data.shortCode);
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
        shortCode,
        username: this.state.data.shortCode,
        fullName: this.state.data.schoolName,
      },
    });
  }

  upload(file) {
    var photo = new FormData();
    photo.append('logos', file);

    upload
      .post('/api/uploadFile')
      .send(photo)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
        this.setState({
          imageUrl: res.body.data,
          uploading: false,
          data: {
            ...this.state.data,
            logo: res.body.response.path_display,
          },
        });
      });
  }

  onImageDrop(files) {
    this.setState({
      uploadFile: files[0],
      uploading: true,
    });
    this.upload(files[0]);
  }

  check() {
    let {
      schoolName,
      shortCode,
      address,
      phoneNumber,
      country,
      password,
      email,
      founded,
      fullName,
      userType,
      username,
      logo,
    } = this.state.data;
    let check = [
      schoolName,
      shortCode,
      address,
      phoneNumber,
      country,
      password,
      email,
      founded,
      fullName,
      userType,
      username,
      logo,
    ];
    check = check.every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Fields with * are compulsory'));
    } else {
      this.props.dispatch(showInfo('Creating School'));
      this.register();
    }
  }

  register() {
    const { username, password } = this.state.data;
    if ((username, password)) {
      callApi('/auth/createSchool', { ...this.state.data }, 'POST')
        .then(data => {
          this.setState({
            data: {
              schoolName: '',
              shortCode: '',
              address: '',
              phoneNumber: '',
              country: '',
              email: '',
              founded: '',
              fax: '',
              fullName: '',
              address: '',
              username: '',
              logo: '',
            },
            uploadFile: '',
            uploading: false,
            imageUrl: '',
          });
          this.props.dispatch(showInfo('Successfully Created'));
        })
        .catch(err => this.props.dispatch(showError('Error Creating school')));
    } else {
      this.props.dispatch(showError('Kindly provide value for all Inputs!'));
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="animated fadeIn container-fluid">
        <Card style={{ padding: 15 }}>
          <CardBlock>
            <InstitutionDetail
              data={data}
              edit={e => this.handleInputChange(e)}
              submit={() => this.check()}
              onImageDrop={files => this.onImageDrop(files)}
              image={this.state.imageUrl}
              uploading={this.state.uploading}
            />
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(InstitutionDetails);
