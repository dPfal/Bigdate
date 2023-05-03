import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { ADDRESS } from '../../Adress';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import ListTable from '../../components/table/admin/ListTable';


function UserList() {

    const [ dataList, setDataList ] = useState([]);
    const [pageNumber, setPageNumber] = useState(0); 
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  
  
    let items = [];
    const totalPages = 10; 
    const startPage = Math.max(1, pageNumber - 2);
    const endPage = Math.min(totalPages, pageNumber + 1);

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageNumber + 1}
          onClick={() => setPageNumber(number - 1)}
        >
          {number}
        </Pagination.Item>
      );
    }
      
      const paginationBasic = (
        <div>
          <Pagination size="sm">{items}</Pagination>
        </div>
      );
    
     
    
      //서버에 코스 목록 조회 요청하기
      const fetchDataList = () => {
        const id = localStorage.getItem('id');
        axios.get(`${ADDRESS}/admin/members`)
          .then(response => {
            console.log(response.data);
            setDataList(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      };

      useEffect(() => {
        fetchDataList();
      }, [pageNumber]);


  
      return (
        <div>
       <div className="background-container">
      
      <div className="overlay-container">
  
     

        <div className='line'>회원 관리</div>

        <div >
        <>
            
            <ListTable headersName={['유저번호','이름','아이디', '취향', '관리']}>
                
              { dataList ? dataList.map((item, index) => {
                  return (
                  
                    <CommonTableRow key={index}>
                      <CommonTableColumn>{ item.id }</CommonTableColumn>
                      <CommonTableColumn> {item.userName} </CommonTableColumn>
                      <CommonTableColumn>{ item.userId }</CommonTableColumn>
                      <CommonTableColumn>{item.userMood}</CommonTableColumn>
                      <div><button className='delBtn'>탈퇴</button></div>
                    </CommonTableRow>
                  )
                }) : ''
              }
            </ListTable>
          </>
        </div>
        

      </div>    
      {paginationBasic}
    </div>
    
 </div>

     
      
)
}
export default UserList
