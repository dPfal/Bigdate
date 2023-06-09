import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { ADDRESS } from '../../Adress';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";
import ListTable from '../../components/table/admin/ListTable';



function UserList() {
  const history = useHistory();
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [users, setUsers] = useState([]); // 목록 항목을 저장하는 배열
  const [totalItemsCount,setTotalItemsCount] = useState(0);
  const pageSize = 15; // 페이지당 데이터 개수

   // 페이지 이동
    const handlePageChange = (page) => {
      setPageNumber(page);
      window.scrollTo(0, 0); // 페이지 이동 후 맨 위로 스크롤
    };

    useEffect(() => {
      fetchDataList();
    }, [pageNumber,token]);
    

   // 서버에 사용자 목록 조회 요청하기
const fetchDataList = () => {
  axios
    .get(`${ADDRESS}/admin/members`)
    .then(response => {
      console.log(response.data);
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const slicedData = response.data.slice(startIndex, endIndex); // 페이징 처리된 데이터 슬라이싱
      setDataList(slicedData);
      setTotalItemsCount(response.data.length);
    })
    .catch(error => {
      console.log(error);
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      localStorage.clear();
      window.location.pathname = "/";
    });
};

     
      
      //회원 탈퇴 확인
      function handleDeleteConfirm(id) {
        const result = window.confirm(`Id [${id}] 유저를 탈퇴시키시겠습니까?`);
        if (result === true) {
         handleDelete(id);
        }
        else{ return;}
      }

    //회원 탈퇴
     const handleDelete = async (id) => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
      try {
        const response = await axios.delete(`${ADDRESS}/admin/${id}`);
        console.log(response.data.message);
        
        // 목록을 다시 불러오기 위해 1초 대기 후에 실행
        setTimeout(() => {
          fetchDataList();
        }, 1000);
      } catch (error) {
        console.error(error);
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        localStorage.clear();
        window.location.pathname = "/";
      }
    };

    //Role 변경
    const handleRoleChange = (event, itemId) => {
      const { value } = event.target;
     
      const updatedUsers = users.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            selectedRole: value, 
          };
        }
        return item;
      });
      setUsers(updatedUsers);
    
      // 선택된 역할로 권한 부여 함수 호출
      handleGiveAuth(itemId, value);
    };

    
    //권한 변경 
    const handleGiveAuth = async (id, role) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
      try {
        const response = await axios.patch(
          `${ADDRESS}/admin/${id}?userRole=${role}`
        );
        console.log(response.data);
        alert('권한이 변경되었습니다.')
        // 목록을 다시 불러오기 위해 1초 대기 후에 실행
        setTimeout(() => {
          fetchDataList();
        }, 1000);
      } catch (error) {
        console.error(error);
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        localStorage.clear();
        window.location.pathname = "/";
      }
    };
    
  
      return (
        <div>
       <div className="background-container" style={{height:'850px'}}>
      
      <div className="overlay-container">
  
     

        <div  className='line'>회원 관리
        </div>

        <div >
        <>
            
                  <ListTable headersName={['유저번호', '이름', '아이디', '취향', '권한', '관리']}>
                
              { dataList ? dataList.map((item, index) => {
                  return (
                  
                    <CommonTableRow key={index}>
                      <CommonTableColumn>{ item.id }</CommonTableColumn>
                      {item.userRole === 'ADMIN' ? <CommonTableColumn>{item.userName} (관리자) </CommonTableColumn> : <CommonTableColumn>{item.userName} </CommonTableColumn>}
                      <CommonTableColumn>{ item.userId }</CommonTableColumn>
                      <CommonTableColumn>{item.userMood}</CommonTableColumn>
                      
                      <CommonTableColumn>  
                      <div>
                      <select
                        value={item.userRole} // 개별 목록 항목의 선택된 역할 값으로 설정합니다.
                        onChange={(event) => handleRoleChange(event, item.id)}>
                              <option value="ADMIN">관리자</option>
                              <option value="USER">사용자</option>
                      </select>
                    </div>
                    </CommonTableColumn>
                      {item.userRole === 'USER' ? <div><button className='delBtn' style={{ marginTop: '10px' }} onClick={() => handleDeleteConfirm(item.id)}>탈퇴</button></div>:"" }
                      
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
        itemsCountPerPage={pageSize}
        totalItemsCount={totalItemsCount}
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
