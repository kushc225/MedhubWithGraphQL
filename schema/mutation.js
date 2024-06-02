import gql from "graphql-tag";

export const mutation = gql`
  type Mutation {
    createUser(input: InputUser): User
    donate(input: InputDonate): ResponseDonate
    changeQuantityForMedicine(input: InputForChangeQuantityForMedicine): Med!
  }

  input InputForChangeQuantityForMedicine {
    _id: ID!
    quantity: Int!
  }
  type ResponseDonate {
    success: Boolean!
    msg: String!
    newmed: Med!
  }

  type Med {
    _id: ID!
    name: String!
    mfd: String!
    expire: String!
    quantity: Int!
    createdAt: String!
    updatedAt: String!
  }
  input InputDonate {
    email: String!
    name: String!
    mfd: String!
    expire: String!
    quantity: Int!
  }
  input InputUser {
    name: String!
    phone_no: String!
    address: String!
    email: String!
    password: String!
  }
`;
