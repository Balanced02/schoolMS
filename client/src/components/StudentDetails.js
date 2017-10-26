import React from 'react';
import {
  Card,
  CardHeader,
  Row,
  CardBlock,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from 'reactstrap';

export default ({ data, submit, edit, classes }) => {
  return (
    <div>
      <Card>
        <CardHeader>Personal details</CardHeader>
        <CardBlock>
          <Form>
            <FormGroup row>
              <Label md={2}>Surname</Label>
              <Col md={4}>
                <Input
                  type="text"
                  name="surName"
                  placeholder="Full Name"
                  value={data.surName}
                  onChange={e => edit(e)}
                />
              </Col>
              <Label md={2}>Other Names</Label>
              <Col md={4}>
                <Input
                  type="text"
                  name="Other names"
                  placeholder="Full Name"
                  value={data.oNames}
                  onChange={e => edit(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label xs={12} md={2}>
                Date of Birth
              </Label>
              <Col xs={12} md={4}>
                <Input
                  type="date"
                  name="dob"
                  value={data.dob}
                  placeholder="date placeholder"
                  onChange={e => edit(e)}
                />
              </Col>
              <Label md={2}>Phone Number:</Label>
              <Col xs={12} md={4}>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  placeholder="Phone Number"
                  onChange={e => edit(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>Class</Label>
              <Col md={4}>
                <Input type="select" name="className" onChange={e => edit(e)}>
                  <option selected disabled>
                    {' '}
                    Select one{' '}
                  </option>
                  {classes.map(c => {
                    <option value={c.className}>{c.className}</option>;
                  })}
                </Input>
              </Col>
              <Label md={2}>Gender</Label>
              <Col md={4}>
                <Input type="select" name="gender" onChange={e => edit(e)}>
                  <option value="1" disabled selected>
                    Gender
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>Blood Group</Label>
              <Col md={4}>
                <Input type="select" name="bloodGroup" onChange={e => edit(e)}>
                  <option value="1" disabled selected>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Input>
              </Col>
              <Label md={2}>Religion</Label>
              <Col md={4}>
                <Input type="select" name="religion" onChange={e => edit(e)}>
                  <option value="1" disabled selected>
                    Select Religion
                  </option>
                  <option value="Christianity">Christianity</option>
                  <option value="Islam">Islam</option>
                  <option value="others">Others</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>Address</Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  value={data.address}
                  name="address"
                  placeholder="Address"
                  onChange={e => edit(e)}
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBlock>
      </Card>
      <Card>
        <CardHeader> Last School Attended </CardHeader>
        <CardBlock>
          <Row>
            <Col sm={12} md={4}>
              <Label>School Name</Label>
              <Input
                type="text"
                value={data.lSchName}
                name="lSchName"
                placeholder="School Name"
                onChange={e => edit(e)}
              />
            </Col>

            <Col sm={12} md={4}>
              <Label>School Address</Label>
              <Input
                type="textarea"
                value={data.lSchAddress}
                name="lSchAddress"
                placeholder="Address"
                onChange={e => edit(e)}
              />
            </Col>

            <Col sm={12} md={4}>
              <Label>Qualification</Label>
              <Input
                type="text"
                value={data.lSchQualification}
                name="lSchQualification"
                placeholder="Qualification"
                onChange={e => edit(e)}
              />
            </Col>
          </Row>
        </CardBlock>
      </Card>
      <Card>
        <CardHeader>Parent/Guardian Details</CardHeader>
        <CardBlock>
          <FormGroup row>
            <Label md={2}>Full Name</Label>
            <Col md={4}>
              <Input
                type="text"
                name="pName"
                placeholder="Parent/Guardian name"
                value={data.pName}
                onChange={e => edit(e)}
              />
            </Col>
            <Label md={2}>Phone Number</Label>
            <Col md={4}>
              <Input
                type="email"
                name="pPhoneNumber"
                value={data.pPhoneNumber}
                placeholder="Phone Number"
                onChange={e => edit(e)}
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
                value={data.pOccupation}
                onChange={e => edit(e)}
              />
            </Col>
            <Label md={2}>Office Address</Label>
            <Col md={4}>
              <Input
                type="email"
                name="pOfficeAddress"
                value={data.pOfficeAddress}
                placeholder="E-mail"
                onChange={e => edit(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={2}>Address</Label>
            <Col md={10}>
              <Input
                type="textarea"
                value={data.address}
                name="pAddress"
                placeholder="Address"
                onChange={e => edit(e)}
              />
            </Col>
          </FormGroup>
        </CardBlock>
      </Card>
      <Button onClick={() => submit()}>New Student</Button>
    </div>
  );
};
