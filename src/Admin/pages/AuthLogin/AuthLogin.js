import React, { useState } from 'react';

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { Grid, Form, Button, Header, Dimmer, Loader } from 'semantic-ui-react';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import MainContent from '../../../components/MainContent/MainContent';
import { withRouter } from 'react-router-dom';

const AuthLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event, tokenAuth, client) => {
    event.preventDefault();
    if (email.trim() === '' && password.trim() === '')
      return alert('all input must be entered');

    if (email.trim() !== '' && password.trim() !== '') {
      const res = await tokenAuth({
        variables: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem('authToken', res.data.tokenAuth.token);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/admin');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <NavigationBar />
      <MainContent>
        <Grid verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Mutation mutation={LOGIN_MUTATION}>
                {(tokenAuth, { loading, error, called, client }) => {
                  return (
                    <>
                      <Dimmer active={loading} inverted>
                        <Loader inverted>Loading</Loader>
                      </Dimmer>

                      <Form
                        onSubmit={(event) =>
                          handleSubmit(event, tokenAuth, client)
                        }
                        style={{ marginTop: '9.5em' }}
                      >
                        <Header as='h2' style={{ textAlign: 'center' }}>
                          Adminstration VSystem
                        </Header>
                        <br />
                        <Form.Input
                          type='email'
                          label='Email'
                          placeholder='Enter Email'
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Input
                          type='password'
                          label='Password'
                          placeholder='Password'
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button fluid='true' type='submit'>
                          Login
                        </Button>
                      </Form>
                    </>
                  );
                }}
              </Mutation>
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </MainContent>
    </>
  );
};

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;
export default withRouter(AuthLogin);
