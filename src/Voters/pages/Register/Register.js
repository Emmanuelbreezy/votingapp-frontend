import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  Form,
  Button,
  Card,
  Header,
  Input,
  Modal,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import MainContent from '../../../components/MainContent/MainContent';

const Register = () => {
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [localgovernment, setLocalGovernment] = useState('');
  const [state, setState] = useState('');
  const [fingerprintid, setFingerprintid] = useState('');
  const [photo, setPhoto] = useState('');

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  const [token, setToken] = useState('');
  const [iscopy, setIsCopy] = useState(false);

  const handleSubmit = (event, createUser) => {
    setUsername(firstname);
    event.preventDefault();
    createUser();
    setSurname('');
    setEmail('');
    setFirstname('');
    setLastname('');
    setLastname('');
    setPassword('');
    setDob('');
    setLocalGovernment('');
    setState('');
    setFingerprintid('');
    setPhoto('');
  };

  const copyTextToClip = () => {
    var copyText = document.getElementById('InputToken');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    setIsCopy(true);
    setTimeout(function () {
      setIsCopy(false);
    }, 1000);
  };

  return (
    <>
      <NavigationBar />
      <MainContent>
        <Grid centered>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={4}
            style={{
              paddingTop: '3.5em',
              marginTop: '2.5em',
            }}
          >
            <Card
              style={{
                width: '100%',
              }}
            >
              <Card.Content>
                <Mutation
                  mutation={REGISTER_MUTATION}
                  variables={{
                    email: email,
                    password: password,
                    firstname: firstname,
                    surname: surname,
                    lastname: lastname,
                    dob: dob,
                    localgovernment: localgovernment,
                    fingerprintID: fingerprintid,
                    photo: photo,
                  }}
                  onCompleted={(data) => {
                    var res = data.createUser.user.profileUser.token;
                    setToken(res);
                    setOpen(true);
                  }}
                >
                  {(createUser, { loading, error }) => {
                    return (
                      <>
                        <Dimmer active={loading} inverted>
                          <Loader inverted>Loading</Loader>
                        </Dimmer>
                        <Form
                          onSubmit={(event) => handleSubmit(event, createUser)}
                          style={{
                            paddingTop: '1.5em',
                          }}
                        >
                          {error && <div>Errors</div>}

                          <Header
                            as='h2'
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            Register Voting System
                          </Header>
                          <br />
                          <Form.Input
                            type='text'
                            label='Surname'
                            name='surname'
                            placeholder='Enter Surname'
                            value={surname}
                            onChange={(event) => setSurname(event.target.value)}
                            required={true}
                            id='surnameID'
                            fluid
                          />
                          <Form.Input
                            type='text'
                            label='First Name'
                            name='firstname'
                            fluid
                            placeholder='Enter First Name'
                            value={firstname}
                            required
                            onChange={(event) =>
                              setFirstname(event.target.value)
                            }
                          />
                          <Form.Input
                            type='text'
                            label='Last Name'
                            name='lastname'
                            fluid
                            placeholder='Enter Last Name'
                            required
                            value={lastname}
                            onChange={(event) =>
                              setLastname(event.target.value)
                            }
                          />
                          <Form.Input
                            type='email'
                            label='Email'
                            name='email'
                            fluid
                            placeholder='mail@gmail.om'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <Form.Input
                            type='password'
                            label='Password'
                            name='password'
                            fluid
                            placeholder='Password'
                            value={password}
                            required
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                          <Form.Input
                            type='date'
                            label='Date Of Birth'
                            name='dob'
                            fluid
                            placeholder='Date Of Birth'
                            value={dob}
                            required
                            onChange={(event) => setDob(event.target.value)}
                          />
                          <Form.Input
                            type='text'
                            label='Ward'
                            placeholder='Ward'
                          />
                          <Form.Input
                            type='text'
                            label='Local Government'
                            name='localgovernment'
                            fluid
                            placeholder='Local Government'
                            required
                            value={localgovernment}
                            onChange={(event) =>
                              setLocalGovernment(event.target.value)
                            }
                          />
                          <Form.Input
                            type='text'
                            label='State'
                            placeholder='State'
                            value={state}
                            required
                            onChange={(event) => setState(event.target.value)}
                          />
                          <Form.Input
                            type='text'
                            label='Fingerprint ID'
                            name='fingerprintid'
                            fluid
                            placeholder='Fingerprint ID'
                            required
                            value={fingerprintid}
                            onChange={(event) =>
                              setFingerprintid(event.target.value)
                            }
                          />
                          <Form.Input
                            type='file'
                            name='photo'
                            fluid
                            label='Photo'
                            placeholder='Photo'
                            value={photo}
                            onChange={(event) => setPhoto(event.target.value)}
                          />

                          <Button
                            fluid
                            type='submit'
                            color='blue'
                            disabled={
                              loading ||
                              !firstname.trim() ||
                              !surname.trim() ||
                              !email.trim() ||
                              !fingerprintid.trim() ||
                              !password.trim()
                            }
                          >
                            Sign Up
                          </Button>
                        </Form>
                      </>
                    );
                  }}
                </Mutation>{' '}
              </Card.Content>{' '}
            </Card>{' '}
          </Grid.Column>{' '}
        </Grid>{' '}
      </MainContent>{' '}
      <Modal onClose={() => setOpen(false)} size={'tiny'} open={open}>
        <Modal.Content>
          <Modal.Description>
            <Grid centered columns={1}>
              <Grid.Column>
                <Header>New Account Created</Header>
                <p>
                  '<b>{username}</b>' your account was created successfully.
                </p>
                <br />
                <p>Copy your Voting Token</p>
                <Input
                  action={{
                    color: iscopy ? 'green' : 'teal',
                    labelPosition: 'right',
                    icon: iscopy ? 'check' : 'copy',
                    content: iscopy ? 'Copied' : 'Copy',
                    onClick: copyTextToClip,
                  }}
                  id='InputToken'
                  defaultValue={token}
                />
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='#eee' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button as={Link} content='Login' to='/login' positive />
        </Modal.Actions>
      </Modal>
    </>
  );
};

const REGISTER_MUTATION = gql`
  mutation (
    $email: String!
    $password: String!
    $firstname: String!
    $surname: String!
    $lastname: String
    $fingerprintID: String
    $dob: String
    $photo: String
    $localgovernment: String
  ) {
    createUser(
      email: $email
      password: $password
      firstname: $firstname
      surname: $surname
      lastname: $lastname
      fingerprintID: $fingerprintID
      dob: $dob
      localgovernment: $localgovernment
      photo: $photo
    ) {
      user {
        profileUser {
          token
        }
      }
    }
  }
`;

export default Register;
