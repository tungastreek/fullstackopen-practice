import { useState } from 'react';

const Tooglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={handleToggle}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleToggle}>Cancel</button>
      </div>
    </div>
  );
};

export default Tooglable;
