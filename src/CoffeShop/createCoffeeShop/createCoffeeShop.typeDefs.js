import { gql } from "apollo-server-express";

export default gql`
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      category: String
      file: Upload
    ): createCoffeeShopResult!
  }
`;
