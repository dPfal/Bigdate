import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { HandThumbsUp,Heart, HeartFill, } from 'react-bootstrap-icons';

import moment from 'moment';
import { ADDRESS } from '../../../Adress';
import CommonTableRow from '../../../components/table/CommonTableRow';
import CommonTableColumn from '../../../components/table/CommonTableColumn';
import CommonTable from '../../../components/table/CommonTable';





const PostList_ad = props => {
  const history=useHistory();
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); 
  const [sortOption, setSortOption] = useState(""); // 라디오 버튼의 선택된 옵션 상태 관리
  

// 라디오 버튼의 옵션 변경 핸들러
const handleSortOptionChange = (e) => {
  const newSortOption = e.target.value;
  setSortOption(newSortOption);
  
  axios.get(`${ADDRESS}/courses?page=${pageNumber}&sort=${newSortOption}`)
    .then(response => {
      console.log(response.data);
      setDataList(response.data.content);
    })
    .catch(error => {
      console.log(error);
    });
};


  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const getPostByNo = course_id => {
    const array = dataList.filter(x => x.course_id == course_id);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }

  let items = [];
  const totalPages = 10; // 예시로 총 10 페이지가 있다고 가정합니다.
  const startPage = Math.max(1, pageNumber - 2);
  const endPage = Math.min(totalPages, pageNumber + 2);
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
  useEffect(() => {
    axios.get(`${ADDRESS}/courses?page=${pageNumber}`)
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
         
            {/* 라디오 버튼들 */}
         
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
                ]}
              >
                {dataList
                  ? dataList.map((item, index) => {
                      return (
                        <CommonTableRow key={index}>
                          <CommonTableColumn>{item.courseId}</CommonTableColumn>
                          <CommonTableColumn>
                          <span onClick={() => history.push(`/postViewAd/${item.courseId}`)}>
                            {item.courseTitle}
                          </span>
                          </CommonTableColumn>
                          <CommonTableColumn>{item.userId}</CommonTableColumn>
                          <CommonTableColumn>
                          <HandThumbsUp style={{color:'#1E90FF',marginRight: '5px'}} />
                            {item.likeCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                          <HeartFill style={{color: 'red' , marginRight: '5px'}} /> 
                            {item.scrapCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            {item. date = moment(item.postedDate).format('YYYY-MM-DD')}
                          </CommonTableColumn>
                          <div ><button className='delBtn' style={{width:'50px'}}>삭제</button></div>  
                        </CommonTableRow>
                      );
                    })
                  : ''}
              </CommonTable>
            </>
            <div className='pagination' >{paginationBasic}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PostList_ad;
