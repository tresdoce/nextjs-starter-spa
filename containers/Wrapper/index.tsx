import React from 'react';

//types
import { WrapperContentProps } from './types';

const WrapperContent: React.FunctionComponent<WrapperContentProps> = (
  props
) => {
  const { id, children, active } = props;

  return (
    <div id={id}>
      {/*Wrapper*/}
      <div className="wrapper">
        {/*MAIN-CONTENT*/}
        <div className="main-content">
          {!active ? children : <p>loading...</p>}
        </div>
        {/* /MAIN-CONTENT*/}
      </div>
      {/*/Wrapper*/}
    </div>
  );
};

export default WrapperContent;
