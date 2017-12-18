import React, { Component } from 'react';
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
  CardText,
} from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import AddCourse from '../../components/AddCourse';
import CourseList from '../../components/CourseList';
import ViewCourseModal from '../../components/ViewCourseModal';
import AddClass from '../../components/AddClass';
<<<<<<< HEAD
import CourseMaterial from '../../components/CourseMaterial'
=======
import CourseMaterial from '../../components/CourseMaterial';
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
import ViewClasses from '../../components/ViewClasses';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        courseName: '',
        courseCode: '',
        minAttendance: '',
        description: '',
      },
      courseList: {
        courses: [],
        searching: true,
        count: '',
      },
      modalOpen: false,
      modalTarget: 0,
      modal: {},
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
      loading: false,
    };
  }

  edit(e) {
    let { name, value } = e.target;
    this.setState({
      course: {
        ...this.state.course,
        [name]: value,
      },
    });
  }

  editClass(e) {
    let { name, value } = e.target;
    this.setState({
      classInfo: {
        ...this.state.classInfo,
        [name]: value,
      },
    });
  }

  createCourse() {
    let { courseCode, courseName, minAttendance } = this.state.course;
    let check = [courseCode, courseName, minAttendance].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Fields with * are important'));
    } else {
      this.state.course._id ? this.updateCourse() : this.newCourse();
    }
  }

  createClass() {
    let { classTitle, maxStudents, teacher } = this.state.classInfo;
    let check = [classTitle, maxStudents, teacher].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Fields with * are important'));
    } else {
      this.setState({
        loading: true,
      });
      this.state.classInfo._id ? this.updateClass() : this.newClass();
    }
  }

  updateClass() {
    callApi('/updateClass', this.state.classInfo, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Update Successful'));
        this.setState({
          classInfo: {
            classTitle: '',
            maxStudents: '',
            teacher: '',
          },
          loading: false,
        });
        this.getSummary();
      })
      .catch(err => this.props.dispatch(showError('Error, please retry after some time')));
  }

  newClass() {
    callApi('/addClass', this.state.classInfo, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Added Successfully'));
        this.setState({
          classInfo: {
            classTitle: '',
            maxStudents: '',
            teacher: '',
          },
        });
        loading: false;
        this.getSummary();
      })
      .catch(err => this.props.dispatch(showError('Error, please retry after some time')));
  }

  newCourse() {
    callApi('/createCourse', this.state.course, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Added Successfully'));
        this.getAllCourses();
        this.clearCourseState();
      })
      .catch(err => this.props.dispatch(showError('Error, please retry after some time')));
  }

  updateCourse() {
    callApi('/updateCourse', this.state.course, 'POST')
      .then(data => {
        this.props.dispatch(showInfo('Update Successful'));
        this.getAllCourses();
        this.clearCourseState();
      })
      .catch(err => this.props.dispatch(showError('Error, please retry after some time')));
  }

  clearCourseState() {
    this.setState({
      course: {
        courseName: '',
        courseCode: '',
        minAttendance: '',
        description: '',
      },
      loading: false,
    });
  }

  getAllCourses() {
    callApi('/allCourse')
      .then(data =>
        this.setState({
          courseList: {
            ...this.state.courseList,
            courses: data.courses,
            searching: false,
            count: data.count,
          },
        })
      )
      .catch(err => this.props.dispatch(showError('Error fetching courses')));
  }

  select(data) {
    this.setState({
      course: {
        ...data,
      },
    });
  }

  selectClass(data) {
    this.setState({
      classInfo: {
        ...data,
      },
    });
  }

  toggleModal(course) {
    this.setState({
      modal: course
        ? {
            ...course,
          }
        : {},
      modalOpen: !this.state.modalOpen,
    });
  }

  getClasses() {
    callApi('/allClass')
      .then(data =>
        this.setState({
          classes: {
            classes: data.data,
            searching: false,
          },
        })
      )
      .catch(err => this.props.dispatch(showError('Error Loading Class List')));
  }

  getSummary() {
    this.getAllCourses();
    this.clearCourseState();
    this.getClasses();
    callApi('/allTeachers')
      .then(data => this.setState({ teachers: data.teachers }))
      .catch(err => this.props.dispatch(showError('Error Loading TeacherList')));
  }

  componentWillMount() {
    this.getSummary();
  }

  tabToggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      course,
      courseList,
      target,
      modal,
      modalOpen,
      activeTab,
      classInfo,
      classes,
      teachers,
    } = this.state;
    return (
      <Card className="container" style={{ padding: 10 }}>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                style={{ cursor: 'pointer' }}
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  this.tabToggle('1');
                }}
              >
                Course
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: 'pointer' }}
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.tabToggle('2');
                }}
              >
                Class
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: 'pointer' }}
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  this.tabToggle('3');
                }}
              >
                Materials
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col xs="12" md="6">
                  <AddCourse
                    data={course}
                    edit={e => this.edit(e)}
                    submit={() => this.createCourse()}
                    loading={this.state.loading}
                  />
                </Col>
                <Col xs="12" md="6">
                  <CourseList
                    data={courseList}
                    select={data => this.select(data)}
                    toggleModal={course => this.toggleModal(course)}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col xs="12" md="6">
                  <AddClass
                    data={classInfo}
                    teachers={teachers}
                    edit={e => this.editClass(e)}
                    submit={() => this.createClass()}
                    loading={this.state.loading}
                  />
                </Col>
                <Col xs="12" md="6">
                  <ViewClasses
                    data={classes}
                    select={data => this.selectClass(data)}
                    toggleModal={data => this.toggleClassModal(data)}
                  />
                </Col>
              </Row>
            </TabPane>
<<<<<<< HEAD
             <TabPane tabId="3">
=======
            <TabPane tabId="3">
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
              <Row>
                <Col xs="12" md="6">
                  <CourseMaterial
                    data={courseList}
                    select={data => this.select(data)}
                    toggleModal={course => this.toggleModal(course)}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          <ViewCourseModal data={modal} open={modalOpen} toggle={() => this.toggleModal()} />
        </div>
      </Card>
    );
  }
}

export default connect()(Course);
