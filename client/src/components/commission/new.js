import React, { useState, useEffect } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button
} from 'reactstrap';
import { addCommission } from '../../actions/commissionActions';
import { Redirect } from 'react-router-dom';

// Custom Hook for any and all inputs
const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: e => {
        setValue(e.target.value);
      }
    }
  };
};

const NewCommission = () => {
  const {
    value: title,
    bind: bindTitle,
    reset: resetTitle
  } = useInput("");

  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription
  } = useInput("");

  const {
    value: price,
    bind: bindPrice,
    reset: resetPrice
  } = useInput("");

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Submitting: ${title}, ${description}, ${price}`);

    const newCommission = {
      title: title,
      description: description,
      price: price
    };
    addCommission(newCommission);
    
    resetTitle();
    resetDescription();
    resetPrice();
  };

  return (
    <Form style={styles.container} onSubmit={handleSubmit} autoFocus={false}>
      <h1 style={styles.title}>Upload a new Commission</h1>
      <FormGroup row>
        <Label for="title" sm={2}>Title</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="title"
            id="title"
            { ...bindTitle }
            autoFocus
            required
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="description" sm={2}>Description</Label>
        <Col sm={10}>
          <Input
            type="textarea"
            name="description"
            id="description"
            { ...bindDescription }
            required
          />
        </Col>
      </FormGroup>

      <FormGroup row> 
        <Label for="price" sm={2}>Price</Label>
        <Col sm={10}>
          <Input
            type="number"
            name="price"
            id="price"
            { ...bindPrice }
            min={0}
          />
        </Col>
      </FormGroup>

      {/* <FormGroup row>
        <Label for="image" sm={2}>Image</Label>
        <Col sm={10}>
          <CustomInput type="file" id="image" name="image" />
        </Col>
      </FormGroup> */}

      <FormGroup row style={styles.submitContainer}>
        <Col sm={10}>
          <Input type="submit" style={styles.submitButton} />
          {/* <Button outline color="info" style={styles.submitButton}>Submit</Button> */}
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
  },
  submitContainer: {
    paddingTop: 50,
    paddingLeft: 'auto',
    paddingRight: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  submitButton: {
    fontSize: '1.2em',
    backgroundColor: 'black',
    color: 'white'
  }
};

export default NewCommission;





// -----------------------------------
/* https://medium.com/@geeky_writer_/using-react-hooks-to-create-awesome-forms-6f846a4ce57
// Custom Hook
const useSignUpForm = callback => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = e => {
    if(e) e.preventDefault();
    callback();
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => (
      {
        ...inputs,
        [e.target.name]: e.target.value
      }
    ));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

const NewCommission = () => {
  // Instantiate custom hook
  // Please set the redirect function, to pass as useSignUpForm's parameter (callback())
  // (maybe not)
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(addCommission);
  // Not fucking working

  // Stop jumping around, get the form working first and then do redirect
  // const [redirectToHome, setRedirectToHome] = useState(false);

  return (
    <Form style={styles.container} onSubmit={handleSubmit} autoFocus={false}>
      <h1 style={styles.title}>Upload a new Commission</h1>
      <FormGroup row>
        <Label for="title" sm={2}>Title</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            autoFocus
            required
            value={inputs.title}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="description" sm={2}>Description</Label>
        <Col sm={10}>
          <Input
            type="textarea"
            name="description"
            id="description"
            onChange={handleInputChange}
            required
            value={inputs.description}
          />
        </Col>
      </FormGroup>

      <FormGroup row> 
        <Label for="price" sm={2}>Price</Label>
        <Col sm={10}>
          <Input
            type="number"
            name="price"
            id="price"
            onChange={handleInputChange}
            min={0}
            value={inputs.price}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="image" sm={2}>Image</Label>
        <Col sm={10}>
          <CustomInput type="file" id="image" name="image" />
        </Col>
      </FormGroup>

      <FormGroup row style={styles.submitContainer}>
        <Col sm={10}>
          <Input type="submit" style={styles.submitButton} />
          <Button outline color="info" style={styles.submitButton}>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  );
};
*/