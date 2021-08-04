import React from 'react';
import { Grid } from 'semantic-ui-react';
import SideBar from '../components/SideBar/SideBar';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import MainContent from '../components/MainContent/MainContent';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export const UserContext = React.createContext();

const Layout = (props) => {
  return (
    <Query query={ME_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading..</div>;
        if (error) return <div>Error.</div>;
        var current_user = data.me;
        return (
          <div style={{ overFlow: 'hidden' }}>
            <UserContext.Provider value={current_user}>
              <NavigationBar
                user={current_user}
                profileUser={current_user.profileUser}
              />
              <Grid columns={2}>
                <Grid.Row stretched>
                  <Grid.Column width={3}>
                    <SideBar user={current_user} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <MainContent user={current_user}>
                      {props.children}
                    </MainContent>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </UserContext.Provider>
          </div>
        );
      }}
    </Query>
  );
};

export const ME_QUERY = gql`
  {
    me {
      id
      email
      staff
      admin
      profileUser {
        firstname
      }
      voteSet {
        candidate {
          id
          election {
            id
          }
        }
      }
    }
  }
`;

export default Layout;
