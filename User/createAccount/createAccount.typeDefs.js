import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
  }
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    crateAccount(
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
  type Query {
    seeProfile(username: String): User
  }
`;
