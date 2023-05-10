import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import moment from 'moment';
import { ADDRESS } from '../../../Adress';
import CommonTableRow from '../../../components/table/CommonTableRow';
import CommonTableColumn from '../../../components/table/CommonTableColumn';
import CommonTable from '../../../components/table/CommonTable';





const PostList_ad = props => {
  const history=useHistory();
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); 
  const [sortOption, setSortOption] = useState(""); 
  

//페이지 이동
const handlePageChange = (page) => {
  setPageNumber(page);
};

const handleSortOptionChange = (e) => {
  const newSortOption = e.target.value;
  setSortOption(newSortOption);
  
  axios.get(`${ADDRESS}/courses?page=${pageNumber-1}&sort=${newSortOption}`)
    .then(response => {
      console.log(response.data);
      setDataList(response.data.content);
    })
    .catch(error => {
      console.log(error);
    });
};

const handleDelete = async (courseId) => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
  try {
    const response = await axios.delete(`${ADDRESS}/users/courses/${courseId}`);
    console.log(response);
    
    // 목록을 다시 불러오기
    axios.get(`${ADDRESS}/courses?page=${pageNumber-1}`)
      .then(response => {
        console.log(response.data);
        setDataList(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

function handleDeleteConfirm(courseId) {
  const result = window.confirm(`${courseId}번 글을 삭제하시겠습니까?`);
  if (result === true) {
   handleDelete(courseId);
  }
  else{ return;}
}



  //서버에 코스 목록 조회 요청하기
  useEffect(() => {
    axios.get(`${ADDRESS}/courses?page=${pageNumber-1}`)
      .then(response => {
        console.log(response.data);
        setDataList(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }, [pageNumber]);
  
  
  return (
    
    <div>
      <div className='background-container'style={{height:'700px'}} >
        <div className='overlay-container'>
          <div className='line'>
            커뮤니티 관리
          </div>
         
         
         
            <div className='select_container'>
              <select value={sortOption} onChange={handleSortOptionChange}>
                <option value="courseId">최신 순</option>
                <option value="like">좋아요 순</option>
                <option value="scrap">찜 순</option>
                <option value="comment">댓글 많은 순</option>
              </select>
            </div>


          <div>
            <>
              <CommonTable
                headersName={[
                  '글번호',
                  '제목',
                  '작성자',
                  '좋아요 수',
                  '찜 수',
                  '작성일',
                  '관리'
                ]}
              >
                {dataList
                  ? dataList.map((item, index) => {
                      return (
                        <CommonTableRow key={index}>
                          <CommonTableColumn>{item.courseId}</CommonTableColumn>
                          <CommonTableColumn>
                          <span onClick={() => history.push(`/postViewAd/${item.courseId}`)}>
                            {item.courseTitle} ({item.commentCount})
                          </span>
                          </CommonTableColumn>
                          <CommonTableColumn>{item.userId}</CommonTableColumn>
                          <CommonTableColumn>
                         
                            {item.likeCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                         
                            {item.scrapCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            {item. date = moment(item.postedDate).format('YYYY-MM-DD')}
                          </CommonTableColumn>
                          <div ><button className='delBtn' style={{width:'50px'}} onClick={() =>  handleDeleteConfirm(item.courseId)}>삭제</button></div>  
                        </CommonTableRow>
                      );
                    })
                  : ''}
              </CommonTable>
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
  );
};

export default PostList_ad;
