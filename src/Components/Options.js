import React from 'react';

const TargetOptions = ({id, title}) => {

  return (
    <option value={id} key={id}>
        {title}
    </option>
  )
}

export default TargetOptions;