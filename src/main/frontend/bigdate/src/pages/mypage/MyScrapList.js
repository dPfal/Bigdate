import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useHistory } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import axios from 'axios';
import './Mypage.css'
import MyScrapTable from '../../components/table/MyScrapTable';
import { ADDRESS } from '../../Adress';
import moment from 'moment';
import Pagination from "react-js-pagination";


function MyScrapList() {
    const history=useHistory();
    const [ dataList, setDataList ] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const pageSize = 15; // 페이지당 데이터 개수


  // 서버에 코스 목록 조회 요청하기
  useEffect(() => {
    fetchDataList();
  }, [pageNumber]);

  const fetchDataList = () => {
    axios
      .get(`${ADDRESS}/users/scraps`)
      .then((response) => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const slicedData = response.data.slice(startIndex, endIndex); // 페이징 처리된 데이터 슬라이싱
        setDataList(slicedData);
        setTotalItemsCount(response.data.length);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    window.scrollTo(0,0);
  }


  const handleDeleteConfirm = (courseId) => {
    const result = window.confirm(`${courseId}번 글을 찜 목록에서 삭제하시겠습니까?`);
    if (result === true) {
      handleDelete(courseId);
    } else {
      return;
    }
  };
  
  const handleDelete = async (courseId) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    try {
      const response = await axios.post(`${ADDRESS}/users/scraps?courseId=${courseId}`);
      console.log(response);
  
      // 목록을 다시 불러오기 위해 1초 대기 후에 실행
      setTimeout(() => {
        fetchDataList();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', width: '1200px', margin: '50px' }}>
        <div style={{ width: '250px', margin: '30px 30px' }}>
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
    <div>
    <div className='background-container' style={{height:'720px'}}>
     <div className='overlay-container'>

     <div className='line'>내 찜 목록
    </div>
    
    <div>
    <>
        
        <MyScrapTable headersName={['글번호','제목','작성자', '좋아요 수','찜 수', '작성일','관리']}>
            
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
                  <CommonTableColumn> {item.likeCount}</CommonTableColumn>
                  <CommonTableColumn> {item.scrapCount}</CommonTableColumn>
                  <CommonTableColumn>{moment(item.postedDate).format('YYYY-MM-DD')}</CommonTableColumn>
                  <div><button className='delBtn'style={{marginTop:'10px',fontSize:'12px'}}  onClick={() => handleDeleteConfirm(item.courseId)}>삭제</button></div>
                </CommonTableRow>
              )
            }) : ''

          }

        </MyScrapTable>
      </>
      </div>
      </div>
      </div>
      <div  style={{marginTop:'20px'}}>
       <Pagination
              activePage={pageNumber}
              itemsCountPerPage={15}
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
      </div>
      </div>

)
}

export default MyScrapList;