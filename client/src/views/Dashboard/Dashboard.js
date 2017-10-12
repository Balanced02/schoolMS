import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Row, Col, Card } from 'reactstrap';
import NoticeBoard from '../../components/NoticeBoard';
import Calendar from '../../components/Calendar';
import DashboardSummary from '../../components/DashboardSummary';
import NoticeBoardModal from '../../components/NoticeBoardModal';
import { callApi } from '../../utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      modal: false,
      notice: {
        date: '',
        body: '',
      },
      notices: {
        searching: true,
        notices: [],
      },
      summary: {
        searching: true,
        totalStudents: '',
        pendingReg: '',
        totalTeachers: '',
      },
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

  getSummary() {
    callApi('/getSummary')
      .then(summary => {
        this.setState({
          summary: {
            ...this.state.summary,
            totalStudents: summary.totalStudents,
            pendingReg: summary.pendingReg,
            totalTeachers: summary.totalTeachers,
            searching: false,
          },
          notices: {
            searching: false,
            notices: summary.noticeBoard,
          },
        });
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.getSummary();
  }

  render() {
    const { summary, notice, notices, selectedDays, modal } = this.state;
    return (
      <div className="animated fadeIn container">
        <DashboardSummary data={summary} />
        <Card>
          <Row>
            <Col sm={12} md={5} style={{ float: 'right' }}>
              <Calendar select={day => this.handleDayClick(day)} selectedDays={selectedDays} />
            </Col>
            <Col sm={12} md={7}>
              <NoticeBoard data={notices} />
            </Col>
          </Row>
          <NoticeBoardModal
            isOpen={modal}
            toggle={() => this.toggle()}
            data={notice}
            edit={e => this.editNotice(e)}
          />
        </Card>
      </div>
    );
  }
}

export default Dashboard;
