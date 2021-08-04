import React, { useState } from 'react';
import { Button, Container, Table, Modal, Header } from 'semantic-ui-react';
import Layout from '../../../hoc/Layout';
import { SingleElection } from './SingleElection';
import { SingleCandidate } from './SingleCandidate';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';

import { ME_QUERY } from '../../../hoc/Layout';

const AllElection = ({ history }) => {
  const [addElection, setAddElection] = useState(false);
  const [addCand, setAddCand] = useState(false);

  return (
    <Query query={ME_QUERY} fetchPolicy='cache-and-network'>
      {({ data, loading, error }) => {
        console.log(data);
        var jsx;
        if (loading) return <div> Loading... </div>;
        if (data) {
          if (data.me.staff === false) {
            jsx = <Redirect to='/' />;
          } else {
            jsx = (
              <Layout>
                <Container>
                  <Header as='h2' style={{ marginTop: '1.5rem' }}>
                    Election
                  </Header>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      content='New Election'
                      color='green'
                      onClick={() => setAddElection(true)}
                    />
                  </div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Election Name</Table.HeaderCell>
                        <Table.HeaderCell>Cover Photo</Table.HeaderCell>
                        <Table.HeaderCell>Posted By</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Query query={QUERY_ELECTION}>
                        {({ data, loading, error }) => {
                          if (loading) return <div>Loading...</div>;
                          if (error) return <div>Error</div>;
                          var listEle = data.elections.map((election) => {
                            return <SingleElection data={election} />;
                          });
                          return listEle;
                        }}
                      </Query>
                    </Table.Body>
                  </Table>
                </Container>
                <br />
                <br />
                <br />
                <Container>
                  <Header as='h2' style={{ marginTop: '1.5rem' }}>
                    Candidate
                  </Header>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      content='New Candidate'
                      color='green'
                      onClick={() => setAddCand(true)}
                    />
                  </div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Candidate Name</Table.HeaderCell>
                        <Table.HeaderCell>Candidate Pics</Table.HeaderCell>
                        <Table.HeaderCell>Election Type</Table.HeaderCell>
                        <Table.HeaderCell>Posted By</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Query query={QUERY_CANDIDATES}>
                        {({ data, loading, error }) => {
                          if (loading) return <div>Loading...</div>;
                          if (error) return <div>Error</div>;
                          var listCand = data.allcandidate.map((candidate) => {
                            console.log(candidate);
                            return <SingleCandidate data={candidate} />;
                          });
                          return listCand;
                        }}
                      </Query>
                    </Table.Body>
                  </Table>
                </Container>

                <Modal
                  size={'small'}
                  centered={false}
                  open={addElection}
                  onClose={() => setAddElection(false)}
                >
                  <Modal.Header>New Election</Modal.Header>
                  <Modal.Content></Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setAddElection(false)}>
                      Cancel
                    </Button>
                    <Button color='green'>Submit</Button>
                  </Modal.Actions>
                </Modal>

                <Modal
                  size={'small'}
                  centered={false}
                  open={addCand}
                  onClose={() => setAddCand(false)}
                >
                  <Modal.Header>New Candidate</Modal.Header>
                  <Modal.Content></Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setAddCand(false)}>Cancel</Button>
                    <Button color='green'>Submit</Button>
                  </Modal.Actions>
                </Modal>
              </Layout>
            );
          }
        }
        return jsx;
      }}
    </Query>
  );
};
const QUERY_ELECTION = gql`
  query {
    elections {
      electionName
      coverImg
      createdAt
      postedBy
    }
  }
`;

const QUERY_CANDIDATES = gql`
  query {
    allcandidate {
      id
      candidateImg
      candidateName
      createdAt
      election {
        electionName
      }
      postedBy
    }
  }
`;
export default withRouter(AllElection);
