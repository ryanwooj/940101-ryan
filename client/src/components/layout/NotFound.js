import React from 'react';

const NotFound = () => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' />
        Page Not Found
      </h1>
      <p className='large'>Sorry, This page does not exist!</p>
    </>
  );
};

export default NotFound;
