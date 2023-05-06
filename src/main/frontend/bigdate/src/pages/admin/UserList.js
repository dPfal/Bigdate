import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { ADDRESS } from '../../Adress';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";
import ListTable from '../../components/table/admin/ListTable';



function UserList() {
    const history=useHistory();
    const [ dataList, setDataList ] = useState([]);
    const [pageNumber, setPageNumber] = useState(1); 
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  
  
  
//페이지 이동
const handlePageChange = (page) => {
  setPageNumber(page);
};
    
     
    
      //서버에 사용자 목록 조회 요청하기
      const fetchDataList = () => {
        const id = localStorage.getItem('id');
        axios.get(`${ADDRESS}/admin/members?page=${pageNumber}`)
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


    //회원 탈퇴
     const handleDelete = async (userId) => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
      try {
        //const response = await axios.delete(`${ADDRESS}/users/courses/${courseId}`);
       // console.log(response);
        
        // 목록을 다시 불러오기 위해 1초 대기 후에 실행
        setTimeout(() => {
          fetchDataList();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };
  
      return (
        <div>
       <div className="background-container">
      
      <div className="overlay-container">
  
     

        <div  className='line'>회원 관리
        </div>

        <div >
        <>
            
            <ListTable headersName={['유저번호','이름','아이디', '취향', '관리']}>
                
              { dataList ? dataList.map((item, index) => {
                  return (
                  
                    <CommonTableRow key={index}>
                      <CommonTableColumn>{ item.id }</CommonTableColumn>
                      <CommonTableColumn>{item.userName} </CommonTableColumn>
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
        </div>
        <div  style={{marginTop:'30px'}}>
            <Pagination 
              activePage={pageNumber}
              itemsCountPerPage={15}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              innerClass="pagination"
              prevPageLinkClassName="page-link prev"
              nextPageLinkClassName="page-link next"
            
            />
            </div>  
        </div>

     
      
)
}
export default UserList
