import React from 'react';
import { QueryProvider } from '../../components/common/QueryProvider/QueryProvider';
import { IndexDetailedProps } from './IndexDetailed.types';

const IndexDetailedUI: React.FC<IndexDetailedProps> = ({ symbol }) => {
  return <div>Detailed widget for {symbol}</div>;
};

export const IndexDetailed: React.FC<IndexDetailedProps> = (props) => (
  <QueryProvider>
    <IndexDetailedUI {...props} />
  </QueryProvider>
);
