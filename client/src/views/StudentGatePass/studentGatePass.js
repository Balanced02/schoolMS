<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, { Component } from "react";
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
import {
  Card,
  Col,
  Row,
  Content,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
<<<<<<< HEAD
  CardText,
} from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import CourseList from '../../components/CourseList';
import ViewCourseModal from '../../components/ViewCourseModal';
import CreateStudentGatePass from '../../components/CreateStudentGatePass'
import GatePassList from '../../components/GatePassList'
=======
  CardText
} from "reactstrap";
import { connect } from "react-redux";
import classnames from "classnames";

import { callApi } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";
import CourseList from "../../components/CourseList";
import ViewCourseModal from "../../components/ViewCourseModal";
import CreateStudentGatePass from "../../components/CreateStudentGatePass";
import GatePassList from "../../components/GatePassList";
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31

class studentGatePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentGatePass: {
<<<<<<< HEAD
        passID:'',
        studentName: '',
        contactNumber: '',
        personName: '',
        issueDate: '',
        reason: '',
        employeeName:'',
=======
        passID: "",
        studentName: "",
        contactNumber: "",
        personName: "",
        issueDate: "",
        reason: ""
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
      },
      studentGatePassList: {
        studentGatePasses: [],
        searching: true,
<<<<<<< HEAD
        count: '',
=======
        count: ""
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
      },
      modalOpen: false,
      modalTarget: 0,
      modal: {},
<<<<<<< HEAD
      activeTab: '1',
      classInfo: {
        classTitle: '',
        maxStudents: '',
        teacher: '',
      },
      classes: {
        classes: [],
        searching: false,
      },
      teachers: [],
=======
      activeTab: "1",
      classInfo: {
        classTitle: "",
        maxStudents: "",
        teacher: ""
      },
      classes: {
        classes: [],
        searching: false
      },
      teachers: []
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    };
  }

  edit(e) {
    let { name, value } = e.target;
    this.setState({
      studentGatePass: {
        ...this.state.studentGatePass,
<<<<<<< HEAD
        [name]: value,
      },
=======
        [name]: value
      }
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    });
  }

  editClass(e) {
    let { name, value } = e.target;
    this.setState({
      classInfo: {
        ...this.state.classInfo,
<<<<<<< HEAD
        [name]: value,
      },
=======
        [name]: value
      }
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    });
  }

  createStudentGatePass() {
<<<<<<< HEAD
    let {  studentName, contactNumber, personName,issueDate, reason,  employeeName } = this.state.studentGatePass;
    let check = [ studentName, contactNumber, personName,issueDate, reason, employeeName ].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Fields with * are important'));
    } else {
     this.newGatePass();
    }
  }

 
 
    newGatePass() {
    callApi('/createStudentGatePass', this.state.studentGatePass, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Gate Pass Created Successfully'));
        this.getGatePassList()
        this.clearStudentGatePassState();
      })
      .catch(err => this.props.dispatch(showError('Error, please retry after some time')));
  }


  clearStudentGatePassState() {
    this.setState({
      studentGatePasses: {
         studentName: '',
        contactNumber: '',
        personName: '',
        issueDate: '',
        reason: '',
      },
=======
    let {
      studentName,
      contactNumber,
      personName,
      issueDate,
      reason
    } = this.state.studentGatePass;
    let check = [
      studentName,
      contactNumber,
      personName,
      issueDate,
      reason
    ].every(data => data !== "");
    if (!check) {
      this.props.dispatch(showError("Fields with * are important"));
    } else {
      this.newGatePass();
    }
  }

  newGatePass() {
    callApi("/createStudentGatePass", this.state.studentGatePass, "POST")
      .then(data => {
        this.props.dispatch(showInfo("Gate Pass Created Successfully"));
        this.getGatePassList();
        this.clearStudentGatePassState();
      })
      .catch(err =>
        this.props.dispatch(showError("Error, please retry after some time"))
      );
  }

  clearStudentGatePassState() {
    this.setState({
      studentGatePass: {
        studentName: "",
        contactNumber: "",
        personName: "",
        issueDate: "",
        reason: ""
      }
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    });
  }

  getGatePassList() {
<<<<<<< HEAD
    callApi('/getStudentGatePass')
=======
    callApi("/getStudentGatePass")
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
      .then(data =>
        this.setState({
          studentGatePassList: {
            ...this.state.studentGatePassList,
            studentGatePasses: data.studentGatePasses,
            searching: false,
<<<<<<< HEAD
            count: data.count,
          },
        })
      
      )
      .then(data => this.props.dispatch(showInfo('Gate Pass List Loaded')))
      .catch(err => this.props.dispatch(showError('Error fetching Passes, Please Reload If no changes')));
=======
            count: data.count
          }
        })
      )
      .then(data => this.props.dispatch(showInfo("Gate Pass List Loaded")))
      .catch(err =>
        this.props.dispatch(
          showError("Error fetching Passes, Please Reload If no changes")
        )
      );
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
  }

  select(data) {
    this.setState({
      studentGatePass: {
<<<<<<< HEAD
        ...data,
      },
=======
        ...data
      }
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    });
  }

  selectClass(data) {
    this.setState({
      classInfo: {
<<<<<<< HEAD
        ...data,
      },
=======
        ...data
      }
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    });
  }

  toggleModal(studentGatePass) {
    this.setState({
      modal: studentGatePass
        ? {
<<<<<<< HEAD
            ...studentGatePass,
          }
        : {},
      modalOpen: !this.state.modalOpen,
=======
            ...studentGatePass
          }
        : {},
      modalOpen: !this.state.modalOpen
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    });
  }

  getSummary() {
    this.getAllCourses();
    this.clearCourseState();
    this.getClasses();
<<<<<<< HEAD
    callApi('/allTeachers')
      .then(data => this.setState({ teachers: data.teachers }))
      .catch(err => this.props.dispatch(showError('Error Loading TeacherList')));
=======
    callApi("/allTeachers")
      .then(data => this.setState({ teachers: data.teachers }))
      .catch(err =>
        this.props.dispatch(showError("Error Loading TeacherList"))
      );
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
  }

  componentWillMount() {
    //this.getSummary();
    this.getGatePassList();
  }

  tabToggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
<<<<<<< HEAD
        activeTab: tab,
=======
        activeTab: tab
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
      });
    }
  }

  render() {
    const {
      studentGatePass,
      studentGatePassList,
      target,
      modal,
      modalOpen,
      activeTab,
      classInfo,
      classes,
<<<<<<< HEAD
      teachers,
=======
      teachers
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
    } = this.state;
    return (
      <Card className="container" style={{ padding: 10 }}>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
<<<<<<< HEAD
                style={{ cursor: 'pointer' }}
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  this.tabToggle('1');
                }}
              >
               Student Gate Pass
=======
                style={{ cursor: "pointer" }}
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  this.tabToggle("1");
                }}
              >
                Student Gate Pass
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
<<<<<<< HEAD
                style={{ cursor: 'pointer' }}
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.tabToggle('2');
=======
                style={{ cursor: "pointer" }}
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  this.tabToggle("2");
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
                }}
              >
                Gate Pass List
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col>
                  <CreateStudentGatePass
                    data={studentGatePass}
                    edit={e => this.edit(e)}
                    submit={() => this.createStudentGatePass()}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
<<<<<<< HEAD
                  <GatePassList
                    data={studentGatePassList}
                  />
=======
                  <GatePassList data={studentGatePassList} />
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Card>
    );
  }
}

export default connect()(studentGatePass);
