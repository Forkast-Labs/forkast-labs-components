import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export const QueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
