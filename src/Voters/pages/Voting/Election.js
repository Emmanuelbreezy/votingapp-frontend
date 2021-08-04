import React from 'react';
import { Link } from 'react-router-dom';
import blankimg from '../../../assets/images/blankimg1.jpg';
import { Grid, Dimmer, Image, Header, Card } from 'semantic-ui-react';

const Election = ({ election }) => {
  const urlpath = 'https://emmanuelbreezy.pythonanywhere.com/media/';
  return (
    <Grid.Column mobile={16} tablet={8} computer={4}>
      <Link to={`/voting/${election.urlExtid}`}>
        <Card link style={{ position: 'relative' }}>
          <Image
            src={election.coverImg ? urlpath + election.coverImg : blankimg}
            style={{ height: '300px' }}
          />
          <Dimmer active={true} style={{ backgroundColor: 'rgba(0,0,0,.30)' }}>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                top: '80%',
                left: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,.60)',
                  height: '59px',
                  paddingTop: '0.8em',
                }}
              >
                <Header as='h3' icon inverted>
                  {election.electionName} Election
                </Header>
              </div>
            </div>
          </Dimmer>
        </Card>
      </Link>
    </Grid.Column>
  );
};

export default Election;
