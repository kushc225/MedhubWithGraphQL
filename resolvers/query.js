import {
  getUserList,
  login,
  getUserById,
  myHistory,
  searchMedicine,
  getUserByEmail,
} from "@/query/user.js";
export const queryResolvers = {
  Query: {
    getUserList,
    getUserById,
    login,
    searchMedicine,
    myHistory,
    getUserByEmail,
  },
};
