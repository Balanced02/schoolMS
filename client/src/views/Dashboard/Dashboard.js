import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Row, Col, Card } from 'reactstrap';
import { connect } from 'react-redux';
import Chart from '../../components/Chart/Chart';
import NoticeBoard from '../../components/NoticeBoard';
import Calendar from '../../components/Calendar';
import DashboardSummary from '../../components/DashboardSummary';
import NoticeBoardModal from '../../components/NoticeBoardModal';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

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
        totalStaff: '',
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
            totalStaff: summary.totalStaff,
            searching: false,
          },
          notices: {
            searching: false,
            notices: summary.noticeBoard,
          },
          selectedDays: summary.noticeBoard.map(notice => notice.date),
        });
      })
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
  }

  render() {
    const { summary, notice, notices, selectedDays, modal } = this.state;
    return (
      <div className="animated fadeIn container">
        <DashboardSummary data={summary} />
        <Card style={{ padding: 15 }}>
          <Row>
            <div>
              <Col>
                <Calendar select={day => this.handleDayClick(day)} selectedDays={selectedDays} />
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
           <Chart/>
        </Card>
        
      </div>
    );
  }
}

export default connect()(Dashboard);
