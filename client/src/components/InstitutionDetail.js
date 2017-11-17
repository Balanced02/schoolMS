import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import { Form, FormGroup, FormText, Label, Input, Button, Row, Col } from 'reactstrap';

export default ({ data, edit, submit, onImageDrop, image, uploading, changeImage }) => {
  return (
    <Form>
      {uploading ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p>
              <i className="fa fa-spinner fa-pulse fa-spin fa-5x" style={{ color: 'green' }} />
            </p>
          </div>
          <p style={{ textAlign: 'center', fontSize: 20 }}>Please wait...</p>
        </div>
      ) : image ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="contain">
            <img
              alt="logo"
              src={image}
              className="thumbnail image"
              style={{ width: 'auto', height: 150 }}
            />
            <div className="overlay" onClick={() => changeImage()}>
              <div className="text">Change Image</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Dropzone multiple={false} accept="image/*" onDrop={onImageDrop} name="logos">
            <p style={{ justifyContent: 'center', textAlign: 'center', margin: 10, marginTop: 60 }}>
              Drop an image or click to select a file to upload.
            </p>
          </Dropzone>
        </div>
      )}

      <Row>
        <Col xs="12" md="8">
          <FormGroup>
            <Label for="schoolName">
              Institution Name
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="text"
              name="schoolName"
              value={data.schoolName}
              onChange={edit ? edit : ''}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup>
            <Label for="founded">
              Founded
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input type="month" name="founded" value={data.founded} onChange={edit ? edit : ''} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="5" xs="12">
          <FormGroup>
            <Label for="address">
              Institution Address
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="textarea"
              name="address"
              placeholder="Institution Address"
              value={data.address}
              onChange={edit ? edit : ''}
            />
          </FormGroup>
        </Col>
        <Col md="3" xs="12">
          <FormGroup>
            <Label for="shortCode">
              Short Code
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="text"
              name="shortCode"
              value={data.shortCode}
              onChange={edit ? edit : ''}
            />
            <FormText color="muted">Used in generating admission number for students</FormText>
          </FormGroup>
        </Col>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="email">
              Institution E-mail Address
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="text"
              name="email"
              placeholder="E-Mail Address"
              value={data.email}
              onChange={edit ? edit : ''}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="6" md="4">
          <FormGroup>
            <Label for="phoneNumber">
              Phone Number
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="+123 456 7890"
              value={data.phoneNumber}
              onChange={edit ? edit : ''}
            />
          </FormGroup>
        </Col>
        <Col xs="6" md="4">
          <FormGroup>
            <Label for="fax">
              Fax
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="text"
              name="fax"
              placeholder="+123 456 7890"
              value={data.fax}
              onChange={edit ? edit : ''}
            />
          </FormGroup>
        </Col>
        <Col xs="6" md="4">
          <FormGroup>
            <Label for="country">
              Country
              <span style={{ color: 'red' }}> *</span>
            </Label>
            <Input
              type="text"
              name="country"
              placeholder="Nigeria"
              value={data.country}
              onChange={edit ? edit : ''}
            />
          </FormGroup>
        </Col>
      </Row>

      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
