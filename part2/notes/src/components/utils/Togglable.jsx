import { forwardRef, useState, useImperativeHandle } from 'react';

const Tooglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      handleToggle,
    };
  });

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
});

Tooglable.displayName = 'Tooglable';

export default Tooglable;
