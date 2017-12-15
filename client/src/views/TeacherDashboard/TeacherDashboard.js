import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Row,
  Col,
  Card,
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

import NoticeBoard from '../../components/NoticeBoard';
import Notepad from '../../components/Notepad';
import TimeTable from '../../components/TimeTable';
import Calendar from '../../components/Calendar';
import TeacherDashboardSummary from '../../components/TeacherDashboardSummary';
import NoticeBoardModal from '../../components/NoticeBoardModal';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import NoteList from '../../components/NoteList.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      modal: false,
      searching:true,
      notice: {
        date: '',
        body: '',
      },
       note: {
        date: '',
        body: '',
      },
      notices: {
        searching: true,
        notices: [],
      },
       noteList: {
        searching: true,
        notes: [],
      },
      summary: {
        searching: true,
        totalStudents: '',
        pendingReg: '',
        totalStaff: '',
      },
      activeTab: '1',
    };
  }

  handleDayClick(day) {
    this.setState({
      modal: !this.state.modal,
      notice: {
        ...this.state.notice,
        date: day,
      },
    }); 
  }

  tabToggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  editNotice(e) {
    this.setState({
      notice: {
        ...this.state.notice,
        body: e.target.value,
      },
    });
  }
  
  
  editNote(e) {
    
    this.setState({
      note: {
        ...this.state.note,
        body: e.target.value,
      },
    });
    console.log(this.state.note.body);
  }


    
    // for creating Notes
  createNote() {
     let check = this.state.note.body;
    if (check === '') {
      this.props.dispatch(showError('The field must be filled'));
    } else {
      callApi('/createNote', this.state.note, 'POST')
        .then(data => this.props.dispatch(showInfo('New Note Added')))
        .catch(err => this.props.dispatch(showError('Error Creating Note')));
         this.setState({
        note: {
        ...this.state.note,
        body:'',
      },
    });
        this.getSummary();
    }
  }

 getSummary() {
    callApi('/getSummary')
      .then(summary => {
        this.setState({
          summary: {
            ...this.state.summary,
            totalStudents: summary.totalStudents,
            pendingReg: summary.pendingReg,
            totalStaff: summary.totalStaff,
            searching: false,
          },
          notices: {
            searching: false,
            notices: summary.noticeBoard,
          },
          noteList: {
            searching: false,
            notes: summary.notes,
          },
          selectedDays: summary.noticeBoard.map(notice => notice.date),
        });
      })
      .catch(err => console.log(err));
  }
  
  
  getNotes() {
    callApi('/getNotes')
      .then(data =>
        this.setState({
          noteList: {
            ...this.state.noteList,
            notes: data.notes,
            searching: false,
            count: data.count,
          },
        })
      )
      .catch(err => console.log(err));
  }

  
  createNotice() {
    let { date, body } = this.state.notice;
    let check = [date, body].every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('The field must be filled'));
    } else {
      callApi('/createNotice', this.state.notice, 'POST')
        .then(data => this.props.dispatch(showInfo('New Notice Added')))
        .catch(err => this.props.dispatch(showError('Error Creating Notice')));
      this.toggle();
      this.getSummary();
    }
  }


  componentWillMount() {
    this.getSummary();
    //this.getNotes();
  }
  


  render() {
    const { summary, notice, notices, noteList, note, selectedDays, modal, activeTab } = this.state;
    return (
      <div className="animated fadeIn container">
        <TeacherDashboardSummary data={summary} />
        <Card className="container" style={{ padding: 10 }}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  this.tabToggle('1');
                }}
                style={{ cursor: 'pointer' }}
              >
                Notice
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.tabToggle('2');
                }}
                style={{ cursor: 'pointer' }}
              >
                Activities
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <div>
                  <Col style={{ justifyContent: 'center' }}>
                    <Calendar
                      select={day => this.handleDayClick(day)}
                      selectedDays={selectedDays}
                    />
                  </Col>
                </div>
                <Col>
                  <div style={{ alignSelf: 'stretch', flex: 1 }}>
                    <NoticeBoard data={notices} />
                  </div>
                </Col>
              </Row>
              <NoticeBoardModal
                isOpen={modal}
                toggle={() => this.toggle()}
                data={notice}
                edit={e => this.editNotice(e)}
                submit={() => this.createNotice()}
              />
            </TabPane>
            <TabPane tabId="2">
            <Row>
            <Col>
              <Notepad
              
              edit = {e => this.editNote(e)}
              note = {note}
              submit = {() => this.createNote()}
              />
              </Col>
              </Row>
              <NoteList data={noteList}/>
            </TabPane>
          </TabContent>
        </Card>
      </div>
    );
  }
}

export default connect()(Dashboard);
