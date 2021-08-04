import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';

import { Query } from 'react-apollo';
import Layout from '../../../hoc/Layout';
// import man from '../../../assets/images/man.png';
// import man1 from '../../../assets/images/man1.png';
// import avatar from '../../../assets/images/avatar.jpg';
import Candidate from './Candidate';
import { Grid, Button, Header, Segment, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import loader from '../../../assets/images/loader.gif';

const Voting = ({ match }) => {
  const url_eid = match.params.voteurl;
  return (
    <Layout>
      <Grid style={{ paddingTop: '0.2em' }}>
        <Query query={QUERY_CANDIDATE} variables={{ urlextid: url_eid }}>
          {({ data, loading, error }) => {
            if (loading)
              return (
                <Grid.Column
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={loader}
                    alt=''
                    style={{
                      width: '300px',
                      height: 'auto',
                      margin: '0 auto',
                    }}
                  />
                </Grid.Column>
              );
            if (error) return <div>Error Occur</div>;
            if (data.candidate.length === 0) {
              return (
                <Grid.Column mobile={16} tablet={8} computer={16}>
                  <Segment placeholder style={{ marginTop: '4em' }}>
                    <Header icon>
                      <Icon name='user' />
                      No Candidate are listed.
                    </Header>
                    <Button as={Link} to='/' primary>
                      Go Back
                    </Button>
                  </Segment>
                </Grid.Column>
              );
            }
            var eleName = '';
            var candidatesList = data.candidate.map((candid) => {
              eleName = candid.election.electionName;
              return <Candidate key={candid.id} data={candid} />;
            });
            return (
              <>
                <Grid.Row>
                  <Grid.Column>
                    <Header as='h1' style={{ marginTop: '1.5rem' }}>
                      {eleName} Election
                    </Header>
                    <p style={{ fontSize: '14px' }}>Vote a Candidate</p>
                  </Grid.Column>
                </Grid.Row>
                {candidatesList}
              </>
            );
          }}
        </Query>
      </Grid>
    </Layout>
  );
};

const QUERY_CANDIDATE = gql`
  query Canditate($urlextid: String!) {
    candidate(urlextid: $urlextid) {
      id
      candidateImg
      candidateName
      election {
        id
        electionName
      }
    }
  }
`;

export default withRouter(Voting);
