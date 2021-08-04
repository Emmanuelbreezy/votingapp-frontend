import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

export const SingleRow = ({ userdata }) => {
  var dateformat = new Date(userdata.timestamp).toDateString();
  return (
    <Table.Row key={userdata.id}>
      <Table.Cell>{dateformat}</Table.Cell>
      <Table.Cell>{!userdata.profileUser && 'no Name'}</Table.Cell>
      <Table.Cell>{userdata.email}</Table.Cell>
      <Table.Cell>{userdata.admin ? 'Yes' : 'No'}</Table.Cell>
      <Table.Cell>{userdata.active ? 'Yes' : 'No'}</Table.Cell>
    </Table.Row>
  );
};
