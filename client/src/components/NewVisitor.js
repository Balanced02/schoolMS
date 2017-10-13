import React from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormGroup,
  Label,
  Col,
  Input,
} from 'reactstrap';

export default ({ open, toggle, data, confirm, edit }) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Visitation Details</ModalHeader>
      <ModalBody>
        <FormGroup row>
          <Label sm={2}>Id</Label>
          <Col sm={10}>
            <Input type="text" name="id" value={data.id || ''} disabled />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={10}>
            <Input
              value={data.visitorName || ''}
              type="text"
              name="visitorName"
              onChange={e => edit(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>E-mail Address</Label>
          <Col sm={10}>
            <Input value={data.email || ''} type="email" name="email" onChange={e => edit(e)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Address</Label>
          <Col sm={10}>
            <Input value={data.address || ''} type="text" name="address" onChange={e => edit(e)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Phone Number</Label>
          <Col sm={10}>
            <Input
              type="text"
              value={data.phoneNumber || ''}
              name="phoneNumber"
              onChange={e => edit(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>To see: </Label>
          <Col sm={10}>
            <Input
              type="text"
              value={data.visiting || ''}
              name="visiting"
              onChange={e => edit(e)}
            />
          </Col>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={confirm}>
          {data.id ? 'Update Details' : 'New Visitor'}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
