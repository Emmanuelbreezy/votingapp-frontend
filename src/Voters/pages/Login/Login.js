import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

import {
  Grid,
  Form,
  Button,
  Header,
  Image,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import MainContent from '../../../components/MainContent/MainContent';
import { withRouter } from 'react-router-dom';
import overimg from '../../../assets/images/login__overimg2.jpg';

import { QUERY_ListELECTIONS } from '../Voting/Election-List';

const Login = (props) => {
  const [inputToken, setInputToken] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event, tokenAuth, result, client) => {
    event.preventDefault();

    if (!result.data) return alert('all input must be entered');
    if (result) {
      var usermail = result.data.usertoken.user.email;
      const res = await tokenAuth({
        variables: {
          email: usermail,
          password: password,
        },
      });

      localStorage.setItem('authToken', res.data.tokenAuth.token);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
      setInputToken('');
      setPassword('');
    }
  };

  return (
    <>
      <NavigationBar />
      <MainContent>
        <Grid style={{ marginTop: '0em', marginBottom: '0em' }}>
          <Grid.Row style={{ paddingBottom: '0em' }}>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div
                style={{
                  width: '100%',
                  height: '97.7vh',

                  backgroundColor: '#000',
                }}
              >
                <Image
                  src={overimg}
                  style={{ width: '100%', height: '100%', opacity: 0.6 }}
                />
              </div>
            </Grid.Column>
            <Grid.Column
              style={{ margin: '0 auto' }}
              mobile={14}
              tablet={8}
              computer={4}
            >
              <Mutation
                mutation={LOGIN_MUTATION}
                refetchQueries={() => [{ query: QUERY_ListELECTIONS }]}
              >
                {(tokenAuth, { loading, error, called, client }) => {
                  return (
                    <>
                      <Dimmer active={loading} inverted>
                        <Loader inverted>Loading</Loader>
                      </Dimmer>

                      <Query
                        query={QUERY_BY_TOKEN}
                        variables={{ token: inputToken }}
                      >
                        {(result) => {
                          return (
                            <Form
                              onSubmit={(event) =>
                                handleSubmit(event, tokenAuth, result, client)
                              }
                              style={{ marginTop: '9.5em' }}
                            >
                              {error && <div>{error.message}</div>}
                              <Header as='h2' style={{ textAlign: 'left' }}>
                                Voting System
                              </Header>
                              <hr style={{ borderColor: '#eee' }} />
                              <br />
                              <br />
                              <Form.Input
                                type='text'
                                label='Token ID'
                                placeholder='Enter Token ID'
                                value={inputToken}
                                onChange={(event) =>
                                  setInputToken(event.target.value)
                                }
                              />
                              <Form.Input
                                type='password'
                                label='Password'
                                placeholder='Password'
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                              <Button fluid='true' type='submit' color='blue'>
                                Login
                              </Button>
                            </Form>
                          );
                        }}
                      </Query>
                    </>
                  );
                }}
              </Mutation>

              <br />

              <Link type='button' to='/register' style={{}}>
                <span style={{ color: 'black' }}>Don't have an account? </span>
                Register
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </MainContent>
    </>
  );
};

const QUERY_BY_TOKEN = gql`
  query UserToken($token: String!) {
    usertoken(token: $token) {
      user {
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export default withRouter(Login);
