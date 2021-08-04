import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { ME_QUERY } from '../../../hoc/Layout';

export const VoteButton = ({
  candidateId,
  currentUser,
  electionID,
  setOpen,
}) => {
  const [isvote, setIsVote] = useState(false);

  const handleDisableVoteB = () => {
    const userVotes = currentUser.voteSet;
    const isCandidateVoted =
      userVotes.findIndex(
        (candidate) => candidate.candidate.election.id === electionID
      ) > -1;
    setIsVote(isCandidateVoted);

    return isCandidateVoted;
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Mutation
        mutation={CREATE_VOTE_MUTATION}
        variables={{ candidateId }}
        onCompleted={(data) => {
          setOpen(true);
          setTimeout(function () {
            setOpen(false);
          }, 2000);
        }}
        refetchQueries={() => [{ query: ME_QUERY }]}
      >
        {(createVote) => {
          var icon = isvote ? 'check' : 'favorite';
          return (
            <Button
              color={isvote ? 'red' : 'green'}
              content={isvote ? 'Vote' : 'Vote'}
              icon={icon}
              disabled={handleDisableVoteB()}
              label={{
                basic: true,
                color: isvote ? 'red' : 'green',
                pointing: 'left',
                content: isvote ? 'inactive' : 'active',
              }}
              onClick={(event) => {
                createVote();
              }}
            />
          );
        }}
      </Mutation>
    </div>
  );
};

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVote($candidateId: Int!) {
    createVote(candidateId: $candidateId) {
      user {
        id
      }
    }
  }
`;
