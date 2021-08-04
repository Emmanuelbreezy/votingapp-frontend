import React from 'react';
import { Table } from 'semantic-ui-react';

export const SingleElection = ({ data }) => {
  var dateformat = new Date(data.createdAt).toDateString();
  return (
    <Table.Row key={data.id}>
      <Table.Cell>{dateformat}</Table.Cell>
      <Table.Cell>{data.electionName}</Table.Cell>
      <Table.Cell>{data.coverImg}</Table.Cell>
      <Table.Cell>{data.postedBy}</Table.Cell>
    </Table.Row>
  );
};
