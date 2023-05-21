import React, { useState } from 'react';
import './CommonTable.css';
import { useHistory } from 'react-router-dom';


const MyScrapTable = props => {

  const { headersName, children} = props;
  
  return (
    <div>
    <table className="common-table" style={{width:'720px'}}>
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