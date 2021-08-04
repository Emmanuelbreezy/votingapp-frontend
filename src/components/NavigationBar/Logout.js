import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const Logout = ({ user, history }) => {
  const handlelogout = (client) => {
    localStorage.removeItem('authToken');
    client.writeData({ data: { isLoggedIn: false } });
    console.log(user, 'logout');
    user.admin || user.staff
      ? history.push('/admin/login')
      : history.push('/login');
  };
  return (
    <ApolloConsumer>
      {(client) => (
        <Menu.Item
          as={Button}
          name='Logout'
          onClick={() => handlelogout(client)}
          style={{ float: 'right', color: 'white' }}
        />
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);
