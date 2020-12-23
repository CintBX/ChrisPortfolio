import React from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput
} from 'reactstrap';

// Title
// Description
// Price
// Image

const NewCommission = () => {
  return (
    <Form style={styles.container}>
      <h1 style={styles.title}>Upload a new Commission</h1>
      <FormGroup row>
        <Label for="title" sm={2}>Title</Label>
        <Col sm={10}>
          <Input type="text" name="title" id="title" placeholder="" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="description" sm={2}>Description</Label>
        <Col sm={10}>
          <Input type="textarea" name="description" id="description" placeholder="" />
        </Col>
      </FormGroup>
      {/* add the dollar sign VVVV */}
      <FormGroup row> 
        <Label for="price" sm={2}>Price</Label>
        <Col sm={10}>
          <Input type="number" name="price" id="price" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="image" sm={2}>Image</Label>
        <Col sm={10}>
          <CustomInput type="file" id="image" name="image" />
        </Col>
      </FormGroup>
    </Form>
  );
};

const styles = {
  container: {
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  title: {
    paddingBottom: 50
  }
};

export default NewCommission;