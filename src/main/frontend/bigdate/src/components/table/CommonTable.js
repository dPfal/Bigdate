import React, { useState } from 'react';
import './CommonTable.css';
import { Pencil} from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';




const CommonTable = props => {

  const { headersName, children} = props;


  const history = useHistory();

  const handleButtonClick = () => {
    //로그인 안 한 사용자일 경우 글쓰기 x
    if (!localStorage.getItem('token')) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
   
    history.push('/user/course/write');
  };

 

  return (
    <div>
    <table className="common-table">
      <thead>
      
        {<td colSpan={headersName.length} style={{ textAlign: "right"}}>
            {/* 라디오 버튼들 */}
            <div className='head_container'>
            <div style={{marginRight:'30px'}}>
                <button onClick={handleButtonClick} style={{margiLeft:'100px',marginTop:'10px'}}>
                <Pencil fontSize={10} /> 글쓰기
                </button>
            </div> 
              
            </div>
          </td>}
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

export default CommonTable;