import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useHistory } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { HandThumbsUp,Heart, HeartFill, } from 'react-bootstrap-icons';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import './Mypage.css'
import MyScrapTable from '../../components/table/MyScrapTable';
import { ADDRESS } from '../../Adress';
import moment from 'moment';

function MyPostList() {
    const history=useHistory();
    const [ dataList, setDataList ] = useState([]);
    const [pageNumber, setPageNumber] = useState(0); 
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  
    let items = [];
    const totalPages = 10; // 예시로 총 10 페이지가 있다고 가정합니다.
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
  useEffect(() => {
    axios.get(`${ADDRESS}/users/scraps`)
      .then(response => {
        console.log(response.data);
        setDataList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [pageNumber]);

  return (
    <div>
    <div style={{display:'flex'}}>
    <div style={{width:'250px',margin:'30px 30px'}}>
       <ListGroup>
        <ListGroup.Item action href='/mypage'active={false}>
          마이페이지
        </ListGroup.Item>
        <ListGroup.Item action href='/courses' active={false}>
          내 코스 목록
        </ListGroup.Item>
        <ListGroup.Item action href='/scraps' active={true}>
         내 찜 목록
        </ListGroup.Item>
      </ListGroup>
    </div>
    <div className='background-container' id='mypage_background'>
     <div className='overlay-container'>

     <div className='line'>내 찜 목록
    </div>
    
    <div >
    <>
        
        <MyScrapTable headersName={['글번호','제목','작성자', '좋아요 수','찜 수', '작성일']}>
            
          { dataList ? dataList.map((item, index) => {
              return (
              
                <CommonTableRow key={index}>
                  <CommonTableColumn>{ item.courseId }</CommonTableColumn>
                  <CommonTableColumn>
                      <span onClick={() => history.push(`/postView/${item.courseId}`)}>
                        {item.courseTitle}
                      </span>
                  </CommonTableColumn>
                  <CommonTableColumn>{ item.userId}</CommonTableColumn>
                  <CommonTableColumn>
                          <HandThumbsUp style={{color:'#1E90FF',marginRight: '5px'}} />
                            {item.likeCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                          <HeartFill style={{color: 'red' , marginRight: '5px'}} /> 
                            {item.scrapCount}
                          </CommonTableColumn>
                  <CommonTableColumn>{moment(item.postedDate).format('YYYY-MM-DD')}</CommonTableColumn>
                  <div><button className='delBtn'style={{marginTop:'10px'}} >삭제</button></div>
                </CommonTableRow>
              )
            }) : ''
          }
        </MyScrapTable>
      </>
    </div>
    

  </div>    {paginationBasic}
    </div>
    </div>

  </div>
  
)
}

export default MyPostList
