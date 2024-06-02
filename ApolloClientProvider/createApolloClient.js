"use client";
import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const ApolloClientProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
