import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }
  type Query {
    seeFolloowing(username: String!, lastId: Int!): SeeFollowingsResult
  }
`;
