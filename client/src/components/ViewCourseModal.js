import React from 'react';

import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

export default ({ data, open, toggle }) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Course: {data.courseCode || ''}
        {'|' + data.courseName || ''}{' '}
      </ModalHeader>
      <ModalBody>
        <h5> Minimum Attendance: {data.minAttendance || ''} </h5>
        Description: {data.description || 'Not available'}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          CLOSE
        </Button>
      </ModalFooter>
    </Modal>
  );
};
