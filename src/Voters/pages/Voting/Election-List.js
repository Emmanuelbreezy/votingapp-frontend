import React from 'react';
import { gql } from 'apollo-boost';
import { withRouter, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import Layout from '../../../hoc/Layout';
import Election from './Election';

import { Grid, Header } from 'semantic-ui-react';
import { ME_QUERY } from '../../../hoc/Layout';
import loader from '../../../assets/images/loader.gif';

const ElectionList = () => {
  return (
    <Query query={ME_QUERY} fetchPolicy='cache-and-network'>
      {({ data, loading, error }) => {
        if (data) {
          if (data.me.staff === true) {
            return <Redirect to='/admin/' />;
          }
        }
        return (
          <Layout>
            <Header as='h1' style={{ marginTop: '1.5rem' }}>
              OnGoing Election
            </Header>

            <Grid style={{ paddingTop: '1.3em' }}>
              <Query query={QUERY_ListELECTIONS}>
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
                  if (error) return <div>Error</div>;
                  var elecResult = data.elections.map((election) => {
                    return <Election key={election.id} election={election} />;
                  });
                  return elecResult;
                }}
              </Query>
            </Grid>
          </Layout>
        );
      }}
    </Query>
  );
};

export const QUERY_ListELECTIONS = gql`
  query Election {
    elections {
      id
      urlExtid
      electionName
      coverImg
      candidateSet {
        voteSet {
          user {
            id
          }
        }
      }
    }
  }
`;
export default withRouter(ElectionList);
