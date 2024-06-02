// lib/queries/getUserById.js

import { gql } from "graphql-request";

export const GET_USER_BY_ID = gql`
  query Query($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      user {
        _id
        email
        name
      }
    }
  }
`;

export const GET_USER_LIST = gql`
  query GetUserList {
    getUserList {
      email
      name
    }
  }
`;

export const GET_MY_HISTORY = gql`
  query Query($input: InputHistory!) {
    myHistory(input: $input) {
      MedType {
        name
        expire
        mfd
      }
      len
    }
  }
`;

export const GET_MY_HISTORY_ALL = gql`
  query GetUserList($id: ID!, $showActiveOnly: Boolean) {
    myHistiory(_id: $id, showActiveOnly: $showActiveOnly) {
      quantity
      _id
      active
      createdAt
      description
      name
    }
  }
`;

export const SEARCH_MEDICINE = gql`
  query SearchMedicine($input: InputMed!) {
    searchMedicine(input: $input) {
      user {
        name
        email
      }
    }
  }
`;
