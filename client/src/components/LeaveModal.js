import React from 'react';
import {
  Button,
  Modal,
  Form,
  FormGroup,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Card,
  Col,
  Row,
  CardHeader,
  CardBlock,
} from 'reactstrap';
import moment from 'moment';

export default ({ isOpen, toggle, data, edit, submit, minDate, userType }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{moment(data.date).format('MMM Do YYYY')}</ModalHeader>
      <ModalBody>
        <Card>
          <CardHeader>Leave Application Form</CardHeader>
          <CardBlock>
            <Form>
              <FormGroup row>
                <Label for="applicationCategory" sm={4}>
                  Application Category
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="category"
                    value={data.category}
                    id="applicationCategory"
                    placeholder="Category"
                    bsSize="lg"
                    onChange={e => edit(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="startDate" md={4}>
                  Start Date
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    value={data.startDate}
                    name="startDate"
                    id="startDate"
                    onChange={e => edit(e)}
                    min={minDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="endDate" md={4}>
                  End Date
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="endDate"
                    value={data.endDate}
                    id="endDate"
                    placeholder="default"
                    onChange={e => edit(e)}
                    min={data.startDate || minDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="reason" sm={4}>
                  Reason for Leave
                </Label>
                <Col sm={8}>
                  <Input
                    type="textarea"
                    name="reason"
                    value={data.reason}
                    id="reason"
                    placeholder="Reason for leave"
                    onChange={e => edit(e)}
                  />
                </Col>
              </FormGroup>
            </Form>
            {userType === 'admin' ? (
              <Label className="switch switch-text switch-primary">
                <Input
                  type="checkbox"
                  className="switch-input"
                  name="status"
                  onChange={e => edit(e)}
                  checked={data.status === 'approved'}
                />
                <span className="switch-label" data-on="YES" data-off="NO" />
                <span className="switch-handle" />
              </Label>
            ) : (
              ''
            )}
            <ModalFooter>
              <Button color="info" onClick={submit}>
                {data._id ? 'Update' : 'Submit'}
              </Button>{' '}
              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </CardBlock>
        </Card>
      </ModalBody>
    </Modal>
  );
};
