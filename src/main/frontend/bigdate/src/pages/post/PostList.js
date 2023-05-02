import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { HandThumbsUp,Heart, HeartFill, } from 'react-bootstrap-icons';
import { ADDRESS } from '../../Adress';
import moment from 'moment';



const PostList = props => {
  const history=useHistory();
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); 

  

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
      <div className='background-container' >
        <div className='overlay-container'>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: 'large',
              marginRight: '40px',
              marginLeft: '40px',
              borderBottom: '1px solid gray',
            }}
          >
            그때 코스
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
                        </CommonTableRow>
                      );
                    })
                  : ''}
              </CommonTable>
            </>
            <div className='pagination'>{paginationBasic}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PostList;
