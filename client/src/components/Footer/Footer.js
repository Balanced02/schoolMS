import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a href="http://localhost:8000">SchoolMS</a> &copy; 2017
        <span className="float-right">
          Powered by <a href="http://thehashhub.com">The Hashhub</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
