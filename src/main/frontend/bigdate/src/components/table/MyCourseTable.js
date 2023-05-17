import React, { useState } from 'react';
import './CommonTable.css';
import { Pencil} from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination size="sm">{items}</Pagination>
  </div>
);



const MycourseTable = props => {

  const { headersName, children} = props;
  

  const history = useHistory();




  return (
    <div>
    <table className="common-table"style={{width:'720px'}} >
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

export default MycourseTable;