import React from 'react';
import { Table, Image } from 'semantic-ui-react';

export const SingleCandidate = ({ data }) => {
  const urlpath = 'http://localhost:8000/media/';
  var dateformat = new Date(data.createdAt).toDateString();
  return (
    <Table.Row key={data.id}>
      <Table.Cell>{dateformat}</Table.Cell>
      <Table.Cell>{data.candidateName}</Table.Cell>
      <Table.Cell>
        <Image src={urlpath + data.candidateImg} rounded size='mini' />
      </Table.Cell>
      <Table.Cell>{data.election.electionName}</Table.Cell>
      <Table.Cell>{data.postedBy}</Table.Cell>
    </Table.Row>
  );
};
