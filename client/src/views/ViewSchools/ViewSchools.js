import React, { Component } from 'react';
import { Card, CardBlock, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import {upload} from 'superagent';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import SchoolSearchResult from '../../components/SchoolSearchResult';
import InstitutionDetail from '../../components/InstitutionDetail';

class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searching: true,
      schoolDetail: false,
      school: {},
      count: '',
      imageUrl: '',
      uploadFile: '',
      uploading: false,
    };
  }

  getSchools() {
    callApi('/getSchools')
      .then(data =>
        this.setState({
          searchResults: data.schools,
          count: data.count,
          searching: false,
          schoolDetail: false,
          school: {
            logo: '',
          },
          count: '',
          imageUrl: '',
          uploadFile: '',
          uploading: false,
        })
      )
      .catch(err => this.props.dispatch(showError('Error Loading TeacherList')));
  }

  changeImage() {
    this.setState({
      uploadFile: '',
      uploading: false,
      imageUrl: '',
      school: {
        ...this.state.school,
        logo: '',
      },
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  check() {
    this.state.school.logo
      ? this.checkDetails()
      : this.state.uploadFile
        ? this.upload(this.state.uploadFile)
            .then(data => {
              this.setState({
                imageUrl: data.body.data,
                uploading: false,
                school: {
                  ...this.state.school,
                  logo: data.body.response.path_display,
                },
              });
              this.checkDetails();
              this.props.dispatch(showInfo('Creating School'));
            })
            .catch(err => {
              console.log(err);
              this.props.dispatch(showError('Error Uploading Image'));
            })
        : this.props.dispatch(showError('Please Upload a logo'));
  }

  checkDetails() {
    let {
      schoolName,
      shortCode,
      address,
      phoneNumber,
      country,
      email,
      founded,
      fullName,
      userType,
      username,
      logo,
    } = this.state.school;
    let check = [
      schoolName,
      shortCode,
      address,
      phoneNumber,
      country,
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
      this.updateSchool();
    }
  }

  updateSchool() {
    callApi('/updateSchool', { ...this.state.school }, 'POST')
      .then(data => {
        this.setState({
          school: {
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
          schoolDetail: false,
          imageUrl: '',
        });
        this.getSchools();
        this.props.dispatch(showInfo('Updated Successfully'));
      })
      .catch(err => this.props.dispatch(showError('Error Updating school')));
  }

  edit(e) {
    let { name, value } = e.target;
    this.setState({
      school: {
        ...this.state.school,
        [name]: value,
      },
    });
  }

  onImageDrop(files) {
    this.setState({
      uploadFile: files[0],
      uploading: true,
      school: {
        ...this.state.school,
        logo: '',
      },
    });
    this.viewFile(files[0]);
  }

  viewFile(file) {
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        data: {
          ...this.state.data,
          file: file,
        },
        uploading: false,
        imageUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      var photo = new FormData();
      photo.append('logos', file);
      upload
        .post('/api/uploadFile')
        .send(photo)
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    });
  }

  select(data) {
    this.setState({
      school: {
        ...data,
      },
      uploading: true,
    });
    this.toggle();
    this.getImageUrl(data.logo);
  }

  toggle() {
    this.setState({
      schoolDetail: !this.state.schoolDetail,
    });
  }

  getImageUrl(path) {
    console.log(path);
    callApi('/getImageUrl', { logo: path }, 'POST')
      .then(link =>
        this.setState({
          imageUrl: link,
          uploading: false,
        })
      )
      .catch(err => {
        this.setState({
          imageUrl: '',
          uploading: false,
        });
        this.props.dispatch(showError('Error getting image link'));
      });
  }

  componentWillMount() {
    this.getSchools();
  }

  render() {
    const { school, uploading, schoolDetail, imageUrl } = this.state;
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardHeader> School List </CardHeader>
          <CardBlock>
            {!schoolDetail ? (
              <SchoolSearchResult
                data={this.state.searchResults}
                searching={this.state.searching}
                select={d => this.select(d)}
              />
            ) : (
              <div>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{ float: 'right', cursor: 'pointer', color: 'red' }}
                  onClick={() => this.toggle()}
                />
                <InstitutionDetail
                  data={school}
                  edit={e => this.edit(e)}
                  submit={() => this.check()}
                  changeImage={() => this.changeImage()}
                  onImageDrop={files => this.onImageDrop(files)}
                  image={imageUrl}
                  uploading={uploading}
                />
              </div>
            )}
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(SchoolList);
