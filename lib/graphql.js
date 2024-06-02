// lib/graphql.js

import { GraphQLClient } from "graphql-request";

export const request = async (query, variables) => {
  const client = new GraphQLClient("http://localhost:3000/api/graphql");
  try {
    return variables
      ? await client.request(query, variables)
      : await client.request(query);
  } catch (error) {
    console.error("GraphQL request error:", error.message);
    throw new Error("Failed to fetch data from the GraphQL API");
  }
};
