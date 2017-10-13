import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle,
} from 'reactstrap';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      user: this.props.user,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  signout() {
    callApi('/auth/logout')
      .then(() => {
        this.props.dispatch(showInfo('Logging Out'));
        window.location.reload();
      })
      .catch(err => this.props.dispatch(showError('Error Logging Out')));
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          &#9776;
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          &#9776;
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <i className="icon-user" style={{ marginRight: 5, fontSize: 20 }} />
                <span className="d-md-down-none">{this.state.user.username}</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-user" /> Profile
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-wrench" /> Settings
                </DropdownItem>
                <DropdownItem onClick={() => this.signout()}>
                  <i className="fa fa-lock" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    );
  }
}

export default connect()(Header);
