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

export default ({ isOpen, toggle, data, edit, category, submit, minDate, userType, type }) => {
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
                    type="select"
                    name="category"
                    id="applicationCategory"
                    placeholder="Category"
                    bsSize="lg"
                    onChange={edit ? e => edit(e) : ''}
                  >
                    <option selected disabled>
                      {' '}
                      Select One{' '}
                    </option>
                    {type === 'view' ? (
                      <option value={data.category} selected>
                        {data.category}
                      </option>
                    ) : category ? (
                      category.map(leave => (
                        <option value={leave.category} selected={leave.category === data.category}>
                          {' '}
                          {leave.category}{' '}
                        </option>
                      ))
                    ) : (
                      ''
                    )}
                  </Input>
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
                    onChange={edit ? e => edit(e) : ''}
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
                    onChange={edit ? e => edit(e) : ''}
                    min={minDate ? data.startDate || minDate : ''}
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
                    onChange={edit ? e => edit(e) : ''}
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
                  onChange={edit ? e => edit(e) : ''}
                  checked={data.status === 'approved'}
                />
                <span className="switch-label" data-on="YES" data-off="NO" />
                <span className="switch-handle" />
              </Label>
            ) : (
              ''
            )}
            <ModalFooter>
              {edit ? (
                <div>
                  <Button color="info" onClick={submit}>
                    {data._id ? 'Update' : 'Submit'}
                  </Button>{' '}
                  <Button color="danger" onClick={toggle}>
                    Cancel
                  </Button>
                </div>
              ) : (
                ''
              )}
            </ModalFooter>
          </CardBlock>
        </Card>
      </ModalBody>
    </Modal>
  );
};
