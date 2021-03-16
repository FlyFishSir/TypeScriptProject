import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Container } from 'reactstrap';
import PersonalDetails from './PersonalDetails';
import { IPersonState } from './Types';

function App () {
  const defaultPerson: IPersonState = {
    Address1: '',
    Address2: '',
    County: '',
    DateOfBirth: new Date().toISOString().substring(0, 10),
    FirstName: '',
    LastName: '',
    PersonId: '',
    PhoneNumber: '',
    Postcode: '',
    Town: ''
  };

  return (
    <Container className="App">
      <PersonalDetails DefaultState={ defaultPerson }/>
    </Container>
  );
}

export default App;
