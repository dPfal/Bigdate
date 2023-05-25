import React, { useState } from 'react';
import './CommonTable.css';

const MyScrapTable = props => {

  const { headersName, children} = props;
  
  return (
    <div>
      <table className="common-table"  >
<thead>
     <tr>
      
       
          {
            headersName.map((item, index) => {
              return (
                <td className="common-table-header-column" style={{backgroundColor:'#f5f5f5'}} key={index}>{ item }</td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>   

    </table>

   

    </div>
  )
}

export default MyScrapTable;