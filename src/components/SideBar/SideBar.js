import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

const SideBar = ({ user }) => {
  var isVoter =
    !user.staff || !user.admin ? (
      <Menu.Item
        as={Link}
        to='/'
        style={{
          display: 'block',
          width: '100%',
          backgroundColor: '#ddd',
          padding: '0.8rem',
          borderRight: '3px solid #36a2eb',
        }}
      >
        <Icon name='edge' />
        Election Section
      </Menu.Item>
    ) : null;
  var isStaff =
    user.staff || user.admin ? (
      <>
        <Menu.Item
          as={Link}
          to='/admin/'
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: '#ddd',
            padding: '0.8rem',
            borderRight: '3px solid #36a2eb',
          }}
        >
          <Icon name='plus' />
          Elections
        </Menu.Item>
      </>
    ) : null;
  var isAdmin = user.admin ? (
    <>
      <Menu.Item
        as={Link}
        to='/admin/staff/'
        style={{
          display: 'block',
          width: '100%',

          padding: '0.8rem',
        }}
      >
        <Icon name='user' />
        Staffs
      </Menu.Item>
    </>
  ) : null;

  return (
    <div
      style={{
        width: '17%',
        position: 'fixed',
        height: '100vh',
        backgroundColor: 'whitesmoke',
        paddingTop: '1.3em',
      }}
    >
      {isVoter}
      {isStaff}
      {isAdmin}
    </div>
  );
};

export default SideBar;
