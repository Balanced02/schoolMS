import React, { Component } from "react";
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

class studentGatePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentGatePass: {
        passID: "",
        studentName: "",
        contactNumber: "",
        personName: "",
        issueDate: "",
        reason: ""
      },
      studentGatePassList: {
        studentGatePasses: [],
        searching: true,
        count: ""
      },
      modalOpen: false,
      modalTarget: 0,
      modal: {},
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
    };
  }

  edit(e) {
    let { name, value } = e.target;
    this.setState({
      studentGatePass: {
        ...this.state.studentGatePass,
        [name]: value
      }
    });
  }

  editClass(e) {
    let { name, value } = e.target;
    this.setState({
      classInfo: {
        ...this.state.classInfo,
        [name]: value
      }
    });
  }

  createStudentGatePass() {
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
    });
  }

  getGatePassList() {
    callApi("/getStudentGatePass")
      .then(data =>
        this.setState({
          studentGatePassList: {
            ...this.state.studentGatePassList,
            studentGatePasses: data.studentGatePasses,
            searching: false,
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
  }

  select(data) {
    this.setState({
      studentGatePass: {
        ...data
      }
    });
  }

  selectClass(data) {
    this.setState({
      classInfo: {
        ...data
      }
    });
  }

  toggleModal(studentGatePass) {
    this.setState({
      modal: studentGatePass
        ? {
            ...studentGatePass
          }
        : {},
      modalOpen: !this.state.modalOpen
    });
  }

  getSummary() {
    this.getAllCourses();
    this.clearCourseState();
    this.getClasses();
    callApi("/allTeachers")
      .then(data => this.setState({ teachers: data.teachers }))
      .catch(err =>
        this.props.dispatch(showError("Error Loading TeacherList"))
      );
  }

  componentWillMount() {
    //this.getSummary();
    this.getGatePassList();
  }

  tabToggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
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
      teachers
    } = this.state;
    return (
      <Card className="container" style={{ padding: 10 }}>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  this.tabToggle("1");
                }}
              >
                Student Gate Pass
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  this.tabToggle("2");
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
                  <GatePassList data={studentGatePassList} />
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
