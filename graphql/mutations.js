import { CHANGE_QUANTITY_MUTATION } from "@/graphql/queries";
const [changeQuantityMutation, { data, error }] = useMutation(
  CHANGE_QUANTITY_MUTATION,
  {
    variables: {
      input: {
        _id: "659a2c739647447dfc6074f2",
        quantity: parseInt(input, 10),
      },
    },
  }
);
