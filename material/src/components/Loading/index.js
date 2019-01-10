import React from 'react';
import Loader from './Loader';

function Loading(props) {
  console.log(props.error);
  if (props.error) {
    return <div className="loader-container">Error! Please refresh the page</div>;
  } else if (props.pastDelay) {
    return <div className="loader-container"> <Loader /> </div>;
  } else {
    return null; // Avoiding Flash Of Loading Component (<200ms)
  }
}

export default Loading;