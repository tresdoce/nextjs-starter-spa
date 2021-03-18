import React, { useState, createContext } from 'react';

const OverviewContext = createContext(null);

export const OverviewProvider: React.FunctionComponent = ({ children }) => {
  const [message, setMessage] = useState('Hello World');

  const clear = () => setMessage('Hello World');

  return (
    <OverviewContext.Provider value={{ message, setMessage, clear }}>
      {children}
    </OverviewContext.Provider>
  );
};

OverviewProvider.displayName = 'OverviewProvider';

export default OverviewContext;
