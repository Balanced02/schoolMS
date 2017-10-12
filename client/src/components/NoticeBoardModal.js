import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import moment from 'moment';

export default ({ isOpen, toggle, data, edit }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{moment(data.date).format('MMM Do YYYY')}</ModalHeader>
      <ModalBody>
        <Input type="textarea" name="body" onChange={edit} value={data.body} />
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={toggle}>
          {data._id ? 'Update Notice' : 'Add Notice'}
        </Button>{' '}
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
