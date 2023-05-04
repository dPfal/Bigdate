import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import axios from 'axios';

import { HandThumbsUp,Heart, Pencil } from 'react-bootstrap-icons';
import { ADDRESS } from '../../Adress';
import moment from 'moment';
import Pagination from "react-js-pagination";

const PostList = props => {
  const history=useHistory();
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); 
  const [sortOption, setSortOption] = useState(""); // 라디오 버튼의 선택된 옵션 상태 관리
  


//페이지 이동
  const handlePageChange = (page) => {
    setPageNumber(page);
  };


//서버에 정렬 조회 요청하기
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

 

  //서버에 코스 목록 조회 요청하기
  useEffect(() => {
    axios.get(`${ADDRESS}/courses?page=${pageNumber-1}&id=${localStorage.getItem('id')}`)
      .then(response => {
        console.log(response.data);
        setDataList(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }, [pageNumber]);
  

  const handleButtonClick = () => {
    //로그인 안 한 사용자일 경우 글쓰기 x
    if (!localStorage.getItem('token')) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
   
    window.location.pathname = '/user/course/write';
  };

  return (
    <div>
      <div className='background-container'style={{height:'700px'}} >
        <div className='overlay-container'>
          <div className='line'
          >
            그때 코스
          </div>
         
           
         <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className='select_container' style={{marginLeft:'10px'}}>
              <select value={sortOption} onChange={handleSortOptionChange}>
                <option value="courseId">최신 순</option>
                <option value="like">좋아요 순</option>
                <option value="scrap">찜 순</option>
                <option value="comment">댓글 많은 순</option>
              </select>
            </div>

          <div className='head_container'>
            <div style={{marginRight:'30px'}}>
                <button onClick={handleButtonClick} style={{margiLeft:'100px',marginTop:'10px'}}>
                <Pencil fontSize={10} /> 글쓰기
                </button>
            </div> 
          </div>   
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
                ]}
              >
                {dataList
                  ? dataList.map((item, index) => {
                      return (
                        <CommonTableRow key={index}>
                          <CommonTableColumn>{item.courseId}</CommonTableColumn>
                          <CommonTableColumn>
                          <span onClick={() => history.push(`/postView/${item.courseId}`)}>
                            {item.courseTitle} ({item.commentCount})
                          </span>
                          </CommonTableColumn>
                          <CommonTableColumn>{item.userId}</CommonTableColumn>
                          <CommonTableColumn>
                          <HandThumbsUp style={{color:'#1E90FF',marginRight: '5px'}} />
                            {item.likeCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                          <Heart style={{color: 'red' , marginRight: '5px'}} /> 
                            {item.scrapCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            {item. date = moment(item.postedDate).format('YYYY-MM-DD')}
                          </CommonTableColumn>
                        </CommonTableRow>
                      );
                    })
                  : ''}
              </CommonTable>
            </>
          

          </div>
          
        </div>
      </div>
      <div  className="pagination-container">
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

export default PostList;
