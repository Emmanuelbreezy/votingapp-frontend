import React, { useState } from 'react';
import { Button, Container, Table, Modal, Header } from 'semantic-ui-react';
import Layout from '../../../hoc/Layout';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { SingleRow } from './SngleRow';

const AllStaff = () => {
  const [addStaff, setAddStaff] = useState(false);
  return (
    <Layout>
      <Container>
        <Header as='h2' style={{ marginTop: '1.5rem' }}>
          Staff
        </Header>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            content='New Staff'
            color='green'
            onClick={() => setAddStaff(true)}
          />
        </div>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reg Date</Table.HeaderCell>
              <Table.HeaderCell>Staff Name</Table.HeaderCell>
              <Table.HeaderCell>Staff Email</Table.HeaderCell>
              <Table.HeaderCell>Admin</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Query query={QUERY_STAFF}>
              {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;
                var listEle = data.allstaff.map((user) => {
                  return <SingleRow userdata={user} />;
                });
                return listEle;
              }}
            </Query>
          </Table.Body>
        </Table>
      </Container>
      <Modal
        size={'small'}
        centered={false}
        open={addStaff}
        onClose={() => setAddStaff(false)}
      >
        <Modal.Header>Add Staff</Modal.Header>
        <Modal.Content></Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setAddStaff(false)}>Cancel</Button>
          <Button color='green'>Submit</Button>
        </Modal.Actions>
      </Modal>
    </Layout>
  );
};

const QUERY_STAFF = gql`
  query Staff {
    allstaff {
      id
      email
      admin
      active
      timestamp
      profileUser {
        firstname
      }
    }
  }
`;
export default AllStaff;
