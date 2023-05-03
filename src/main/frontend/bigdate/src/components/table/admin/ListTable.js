import React from 'react'
import './UserListTable.css';

import { useHistory } from 'react-router-dom';





const ListTable = props => {

  const { headersName, children} = props;
  

  const history = useHistory();




  return (
    <div>
    <table className="common-table">
<thead>    
     <tr>
      
       
          {
            headersName.map((item, index) => {
              return (
                <td className="common-table-header-column" key={index}>{ item }</td>
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
export default ListTable
