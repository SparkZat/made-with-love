import { gql } from 'apollo-server';

export const GET_STATUS = gql`
  query status($after: NonEmptyString, $pageSize: PositiveInt!, $channelId: ID!) {
    channel(channelId: $channelId) {
      messages(input: { page: { first: $pageSize, after: $after } }) {
        nodes {
          id
          text
          createdAt
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
