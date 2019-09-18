import React from 'react';
import './style.css';

function RevertHistoryOrder (props) {
  return (
    <button className="revertBtn" onClick={ props.onClick }>
      Revert
    </button>
  );
}

export default RevertHistoryOrder;