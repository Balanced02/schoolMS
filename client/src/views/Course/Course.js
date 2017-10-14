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
import PopOver from '../../components/PopOver';
import ViewCourseModal from '../../components/ViewCourseModal';
import AddClass from '../../components/AddClass';
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
      popoverOpen: false,
      popoverData: {},
      target: 'Popover0',
      modalOpen: false,
      modalTarget: 0,
      modal: {},
      activeTab: '1',
      classInfo: {},
      classes: {
        classes: [],
        searching: false,
      },
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

  createCourse() {
    let { courseCode, courseName, minAttendance } = this.state.course;
    let check = [courseCode, courseName, minAttendance].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('Fields with * are important'));
    } else {
      this.state.course._id ? this.updateCourse() : this.newCourse();
    }
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

  toggle(course, i) {
    console.log('toggling');
    this.setState({
      popoverData: course
        ? {
            ...course,
          }
        : {},
      popoverOpen: !this.state.popoverOpen,
      target: i ? 'Popover' + i : 'Popover0',
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

  componentWillMount() {
    this.getAllCourses();
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
      popoverOpen,
      target,
      modal,
      modalOpen,
      popoverData,
      activeTab,
      classInfo,
      classes,
    } = this.state;
    return (
      <Card className="container" style={{ padding: 10 }}>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
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
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.tabToggle('2');
                }}
              >
                Class
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Row>
                    <Col md={6}>
                      <AddCourse
                        data={course}
                        edit={e => this.edit(e)}
                        submit={() => this.createCourse()}
                      />
                    </Col>
                    <Col md={6}>
                      <CourseList
                        data={courseList}
                        select={data => this.select(data)}
                        toggle={(course, i) => this.toggle(course, i)}
                        toggleModal={course => this.toggleModal(course)}
                      />
                      <PopOver
                        data={popoverData}
                        isOpen={popoverOpen}
                        target={target}
                        toggle={() => this.toggle()}
                      />
                    </Col>
                  </Row>
                  <ViewCourseModal
                    data={modal}
                    open={modalOpen}
                    toggle={() => this.toggleModal()}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col md={6}>
                  <AddClass
                    data={course}
                    edit={e => this.edit(e)}
                    submit={() => this.createCourse()}
                  />
                </Col>
                <Col md={6}>
                  <ViewClasses
                    data={classes}
                    select={data => this.selectClass(data)}
                    toggleModal={course => this.toggleModal(course)}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Card>
    );
  }
}

export default connect()(Course);
