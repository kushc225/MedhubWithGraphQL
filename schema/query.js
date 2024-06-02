import gql from "graphql-tag";

export const query = gql`
  type Query {
    getUserList: [User]
    login(input: InputLogin): LoginResponse
    getUserById(input: FindUserInput!): UserResponse
    getUserByEmail(id: ID!): UserResponse
    searchMedicine(input: InputMed!): [MedWithOwner!]
    myHistory(input: InputHistory!): MedTypeWithLength
  }

  input InputHistory {
    email: String!
    donateOrNeed: String!
    page: Int!
    pageSize: Int!
    sortWithNewestFirst: Boolean!
  }
  input InputMed {
    medName: String!
  }
  input FindUserInput {
    id: String!
  }

  type MedWithOwner {
    med: Med
    user: User
  }

  type UserResponse {
    success: Boolean!
    msg: String!
    user: User
  }
  input InputLogin {
    email: String!
    password: String!
  }

  type LoginResponse {
    success: Boolean!
    msg: String!
    token: String
    headers: LoginResponseHeaders
  }

  type LoginResponseHeaders {
    setCookie: String
  }

  type MedType {
    _id: ID!
    owner: User!
    name: String!
    mfd: String!
    expire: String!
    description: String!
    quantity: Int!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type MedTypeWithLength {
    MedType: [MedType!]
    len: Int!
  }
  type User {
    _id: ID!
    name: String!
    phone_no: String!
    address: String!
    email: String!
    password: String!
  }
`;
