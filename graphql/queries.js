import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
const graphqlEndpoint = "http://localhost:3000/api/graphql";

export const CHANGE_QUANTITY_MUTATION = gql`
  mutation ChangeQuantityForMedicine(
    $input: InputForChangeQuantityForMedicine
  ) {
    changeQuantityForMedicine(input: $input) {
      name
      quantity
      active
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query Query($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      msg
      success
      user {
        _id
        email
        name
      }
    }
  }
`;
export const GET_MY_HISTORY = gql`
  query MyHistory($input: InputHistory!) {
    myHistory(input: $input) {
      _id
      name
      quantity
    }
  }
`;
