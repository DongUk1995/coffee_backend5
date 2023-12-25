import { gql } from "apollo-server-express";

export default gql`
  type FollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    FollowUser(username: String!): FollowUserResult
  }
`;
