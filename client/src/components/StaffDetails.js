import React from 'react';
import { Card, CardHeader, CardBlock, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap';

export default ({ data, edit, submit, headerText, editType }) => {
  return (
    <Card className="container" style={{ padding: 10 }}>
      <CardHeader>{headerText}</CardHeader>
      <CardBlock>
        <FormGroup row>
          <Label md={2}>Academic Year</Label>
          <Col md={4}>
            <Input
              type="select"
              name="academicYear"
              onChange={e => (editType === 'admin' ? edit(e) : '')}
            >
              <option value="1" disabled selected>
                Academic Year
              </option>
              <option value="Male">2016-2017</option>
            </Input>
          </Col>
          <Label md={2}>Joining Date</Label>
          <Col md={4}>
            <Input
              type="date"
              name="joiningDate"
              onChange={e => (editType === 'admin' ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Full Name</Label>
          <Col>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={data.fullName || ''}
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Username</Label>
          <Col md={4}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username || ''}
              onChange={e => (editType === 'admin' ? edit(e) : '')}
            />
          </Col>
          <Label md={2}>E-mail</Label>
          <Col md={4}>
            <Input
              type="email"
              name="email"
              value={data.email || ''}
              placeholder="E-mail"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        {!data._id ? (
          <FormGroup row>
            <Label md={2}>Password</Label>
            <Col md={4}>
              <Input
                type="password"
                name="password"
                value={data.password || ''}
                placeholder="password"
                onChange={e => (edit ? edit(e) : '')}
              />
            </Col>
            <Label md={2}>Re-type Password</Label>
            <Col md={4}>
              <Input
                type="password"
                name="password2"
                value={data.password2 || ''}
                placeholder="Re-type Password"
                onChange={e => (edit ? edit(e) : '')}
              />
            </Col>
          </FormGroup>
        ) : (
          ''
        )}
        <FormGroup row>
          <Label xs={12} md={2}>
            Date of Birth
          </Label>
          <Col xs={12} md={4}>
            <Input
              type="date"
              name="dob"
              value={data.dob || ''}
              placeholder="date placeholder"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
          <Label md={2}>Phone Number:</Label>
          <Col xs={12} md={4}>
            <Input
              type="text"
              name="phoneNumber"
              value={data.phoneNumber || ''}
              placeholder="Phone Number"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
<<<<<<< HEAD
          {!data._id ? (
            <div>
              <Label md={3}>User Type</Label>
              <Col xs={12} md={5} lg={5}>
                <Input type="select" name="userType" onChange={e => (edit ? edit(e) : '')}>
                  <option selected disabled>
                    {' '}
                    Select one{' '}
                  </option>
                  <option value="teacher" selected={data.userType === 'teacher'}> Teaching Staff </option>
                  <option value="non-teaching" selected={data.userType === 'non-teaching'}> Non-Teaching Staff </option>
                  <option value="admin" selected={data.userType === 'admin'}> Admin </option>
                </Input>
              </Col>
            </div>
          ) : (
            ''
          )}
          <Label md={2}>Gender</Label>
          <Col md={3}>
=======
          <Label xs={12} md={2}>
            Gender
          </Label>
          <Col md={4}>
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
            <Input type="select" name="gender" onChange={e => (edit ? edit(e) : '')}>
              <option value="1" disabled selected>
                Gender
              </option>
              <option value="Male" selected={data.gender === 'Male'}>
                Male
              </option>
              <option value="Female" selected={data.gender === 'Female'}>
                Female
              </option>
            </Input>
          </Col>
          {!data._id ? (
            <Row>
              <Label xs={12} md={6}>
                User Type
              </Label>
              <Col xs={12} md={6}>
                <Input type="select" name="userType" onChange={e => (edit ? edit(e) : '')}>
                  <option selected disabled>
                    {' '}
                    Select one{' '}
                  </option>
                  <option value="teacher" selected={data.userType === 'teacher'}>
                    {' '}
                    Teaching Staff{' '}
                  </option>
                  <option value="non-teaching" selected={data.userType === 'non-teaching'}>
                    {' '}
                    Non-Teaching Staff{' '}
                  </option>
                  <option value="admin" selected={data.userType === 'admin'}>
                    {' '}
                    Admin{' '}
                  </option>
                </Input>
              </Col>
            </Row>
          ) : (
            ''
          )}
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Address</Label>
          <Col md={10}>
            <Input
              type="textarea"
              value={data.address || ''}
              name="address"
              placeholder="Address"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
      </CardBlock>
      <CardHeader>Parent Details</CardHeader>
      <CardBlock>
        <FormGroup row>
          <Label md={2}>Full Name</Label>
          <Col md={4}>
            <Input
              type="text"
              name="pName"
              placeholder="Parent/Guardian name"
              value={data.pName || ''}
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
          <Label md={2}>Phone Number</Label>
          <Col md={4}>
            <Input
              type="email"
              name="pPhoneNumber"
              value={data.pPhoneNumber || ''}
              placeholder="Phone Number"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Occupation</Label>
          <Col md={4}>
            <Input
              type="text"
              name="pOccupation"
              placeholder="Occupation"
              value={data.pOccupation || ''}
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
          <Label md={2}>Office Address</Label>
          <Col md={4}>
            <Input
              type="email"
              name="pEmail"
              value={data.pEmail || ''}
              placeholder="Parent E-mail Address"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Address</Label>
          <Col md={10}>
            <Input
              type="textarea"
              value={data.pAddress || ''}
              name="pAddress"
              placeholder="Address"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
      </CardBlock>
      <CardHeader>Bank Details</CardHeader>
      <CardBlock>
        <FormGroup row>
          <Label md={2}>Bank Name</Label>
          <Col md={4}>
            <Input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={data.bankName || ''}
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
          <Label md={2}>Account Number</Label>
          <Col md={4}>
            <Input
              type="text"
              name="accountNo"
              value={data.accountNo || ''}
              placeholder="0123456789"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Sort Code</Label>
          <Col md={4}>
            <Input
              type="text"
              name="sortCode"
              placeholder="Sort Code"
              value={data.sortCode || ''}
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
          <Label md={2}>Account Type</Label>
          <Col md={4}>
            <Input
              type="email"
              name="accountType"
              value={data.accountType || ''}
              placeholder="Savings, Current or others"
              onChange={e => (edit ? edit(e) : '')}
            />
          </Col>
        </FormGroup>
      </CardBlock>
      <Button onClick={() => submit()}>{data._id ? 'Update Profile' : 'New Staff'}</Button>
    </Card>
  );
};
