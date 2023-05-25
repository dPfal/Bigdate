import React from 'react';
import './CommonTable.css';

const CommonTableRow = ({ children }) => {
  return (
    <tr className="common-table-row">
      {
        children
      }
    </tr>
  )
}

export default CommonTableRow;