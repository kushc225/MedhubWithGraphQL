import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { dbConnect } from "@/features/dbConnect";
import { query } from "@/schema/query";
import { mutationResolvers } from "@/resolvers/mutation";
import { queryResolvers } from "@/resolvers/query";
import { mutation } from "@/schema/mutation";
dbConnect();

const typeDefs = gql`
  ${query}
  ${mutation}
`;

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const hanlder = startServerAndCreateNextHandler(server, {
  context: async (req) => req,
});

export { hanlder as GET, hanlder as POST };
