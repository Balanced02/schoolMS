import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Row, Card, CardBlock } from "reactstrap";
import { connect } from "react-redux";
import Dropbox from "dropbox";
import upload from "superagent";

import { callApi } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";
import InstitutionDetail from "../../components/InstitutionDetail";

class InstitutionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        schoolName: "",
        shortCode: "",
        address: "",
        phoneNumber: "",
        country: "",
        password: "testschooladmin",
        email: "",
        founded: "",
        fullName: "",
        address: "",
        userType: "school",
        username: "",
        logo: "",
        file: ""
      },
      uploadFile: "",
      uploading: false,
      imageUrl: ""
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    let shortCode = "";
    name === "shortCode"
      ? (shortCode = value)
      : name === "schoolName"
        ? (shortCode = this.state.data.schoolName
            ? this.state.data.schoolName
                .split(" ")
                .map(a => a.substring(0, 1).toUpperCase())
                .join("")
            : "")
        : (shortCode = this.state.data.shortCode);
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
        shortCode,
        username: this.state.data.shortCode,
        fullName: this.state.data.schoolName
      }
    });
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      var photo = new FormData();
      photo.append("logos", file);
      upload
        .post("/api/uploadFile")
        .send(photo)
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    });
  }

  changeImage() {
    this.setState({
      uploadFile: "",
      uploading: false,
      imageUrl: ""
    });
  }

  onImageDrop(files) {
    this.setState({
      uploadFile: files[0],
      uploading: true
    });
    this.viewfile(files[0]);
  }

  viewfile(file) {
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        data: {
          ...this.state.data,
          file: file
        },
        uploading: false,
        imageUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
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
      file
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
      file,
      fullName,
      userType,
      username
    ];
    check = check.every(data => data !== "");
    if (!check) {
      this.props.dispatch(showError("Fields with * are compulsory"));
    } else {
      console.log("The data went through");
<<<<<<< HEAD
      
    this.props.dispatch(showInfo('Creating School'));
      
      
=======

      this.props.dispatch(showInfo("Creating School"));

>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
      this.upload(this.state.uploadFile)
        .then(data => {
          console.log("data.body.response.path_display");
          this.setState({
            imageUrl: data.body.data,
            uploading: false,
            data: {
              ...this.state.data,
              logo: data.body.response.path_display
            }
          });
<<<<<<< HEAD
          
        })
        .catch(err => this.props.dispatch(showError('Error Uploading Image')));
=======
        })
        .catch(err => this.props.dispatch(showError("Error Uploading Image")));
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
      this.register();
    }
  }

  register() {
    const { username, password, logo } = this.state.data;
    if ((username, password, logo)) {
      callApi("/auth/createSchool", { ...this.state.data }, "POST")
        .then(data => {
          this.setState({
            data: {
              schoolName: "",
              shortCode: "",
              address: "",
              phoneNumber: "",
              country: "",
              email: "",
              founded: "",
              fax: "",
              fullName: "",
              address: "",
              username: "",
              logo: ""
            },
            uploadFile: "",
            uploading: false,
            imageUrl: ""
          });
          this.props.dispatch(showInfo("Successfully Created"));
        })
        .catch(err => this.props.dispatch(showError("Error Creating school")));
    } else {
      this.props.dispatch(showError("Kindly provide value for all Inputs!"));
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
              changeImage={() => this.changeImage()}
              uploading={this.state.uploading}
            />
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(InstitutionDetails);
