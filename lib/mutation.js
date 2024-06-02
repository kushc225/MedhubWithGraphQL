import { gql } from "graphql-request";

export const DONATE = gql`
  mutation Mutation($input: InputDonate) {
    donate(input: $input) {
      success
      newmed {
        name
        mfd
      }
    }
  }
`;

export const CHANGE_QUANTITY_FOR_MEDICINE = gql`
  mutation ChangeQuantityForMedicine(
    $input: InputForChangeQuantityForMedicine
  ) {
    changeQuantityForMedicine(input: $input) {
      _id
      quantity
    }
  }
`;
