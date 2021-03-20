import React from 'react';
import { Wrapper } from '@containers';

// Types
import { OverviewProps } from './types';

const containerName = 'overview';

const Overview: React.FunctionComponent<OverviewProps> = () => {
  return (
    <Wrapper id={containerName} active>
      <h1>Hello world</h1>
    </Wrapper>
  );
};

export default Overview;
