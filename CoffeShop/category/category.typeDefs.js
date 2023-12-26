import { gql } from "apollo-server-express";

export default gql`
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
