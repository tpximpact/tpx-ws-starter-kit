import React from 'react';

function ExampleComponentWithProps(props) {
  const { title, copy } = props;

  return (
    <div>
      <h1 className="text-center text-3xl mb-5">{title}</h1>
      <p className="text-center text-base mb-5">{copy}</p>
    </div>
  );
}

export default ExampleComponentWithProps;
