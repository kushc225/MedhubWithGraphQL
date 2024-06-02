import { createUser, donate, changeQuantityForMedicine } from "@/mutation/user";
export const mutationResolvers = {
  Mutation: {
    createUser,
    donate,
    changeQuantityForMedicine,
  },
};
