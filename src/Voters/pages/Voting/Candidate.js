import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Card, Header, Button, Modal } from 'semantic-ui-react';
import avatar from '../../../assets/images/avatar.jpg';

import { VoteButton } from './VoteButton';
import { UserContext } from '../../../hoc/Layout';

const Candidate = ({ data }) => {
  const [open, setOpen] = useState(false);
  const currentUser = useContext(UserContext);
  const urlpath = 'https://emmanuelbreezy.pythonanywhere.com/media/';
  return (
    <>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Card>
          <div style={{ width: '100%', height: '250px' }}>
            <img
              src={data.candidateImg ? urlpath + data.candidateImg : avatar}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt=''
            />
          </div>
          <Card.Content style={{ textAlign: 'center' }}>
            <Card.Header>{data.candidateName}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <VoteButton
              setOpen={setOpen}
              candidateId={data.id}
              electionID={data.election.id}
              currentUser={currentUser}
            />
          </Card.Content>
        </Card>
      </Grid.Column>
      <Modal onClose={() => setOpen(false)} size={'tiny'} open={open}>
        <Modal.Content>
          <Modal.Description>
            <Grid centered columns={1}>
              <Grid.Column>
                <Header>You've Successfully Voted For a Candidate</Header>
                <p>Check out other Elections</p>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button as={Link} content='Go Home' to='/' positive />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Candidate;
