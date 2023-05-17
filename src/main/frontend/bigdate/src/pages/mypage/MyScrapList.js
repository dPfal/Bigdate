import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  
  const [pageNumber, setPageNumber] = useState(location.state?.pageNumber || 1);
  const [sortOption, setSortOption] = useState(location.state?.sortOption || 'courseId');
  



  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
  }
  
  const handleSortOptionChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  }

 

  //서버에 코스 목록 조회 요청하기
  useEffect(() => {
    const handlePopState = (event) => {
      const { state } = event;
      if (state) {
        setPageNumber(state.pageNumber);
        setSortOption(state.sortOption);
      }
    };
  
    window.addEventListener('popstate', handlePopState);
  
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  useEffect(() => {
    axios.get(`${ADDRESS}/courses?page=${pageNumber-1}&sort=${sortOption}`)
      .then(response => {
        console.log(response.data);
        setDataList(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
    
    // 이전 페이지에서 선택한 정보를 저장합니다.
    const state = { pageNumber, sortOption };
    history.replace({ state });
  }, [pageNumber, sortOption]);
  

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
        <div className='line' style={{marginBottom:'10px'}} >
            그때 코스
          </div>
           
         <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className='select_container' style={{marginLeft:'40px'}}>
              <select value={sortOption} onChange={handleSortOptionChange}>
                <option value="courseId">최신 순</option>
                <option value="like">좋아요 순</option>
                <option value="scrap">찜 순</option>
                <option value="comment">댓글 많은 순</option>
              </select>
            </div>

          <div className='head_container'>
            <div style={{marginRight:'40px'}}>
                <button onClick={handleButtonClick} style={{marginTop:'10px'}}>
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
                          <span onClick={() =>history.push({
                              pathname: `/postView/${item.courseId}`,
                              state: { pageNumber, sortOption }
                            })}>
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

export default PostList;
