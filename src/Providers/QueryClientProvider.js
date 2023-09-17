import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const myQueryClient = new QueryClient();

const MyQueryClientProvider = ({ children }) => {
  return (
    <QueryClientProvider client={myQueryClient}>{children}</QueryClientProvider>
  );
};

export { MyQueryClientProvider };
