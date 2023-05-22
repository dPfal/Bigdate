import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useHistory } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { HandThumbsUp,Heart, HeartFill, } from 'react-bootstrap-icons';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './Mypage.css'
import MycourseTable from '../../components/table/MyCourseTable';
import { ADDRESS } from '../../Adress';
import moment from 'moment';


function MyPostList() {
    const history=useHistory();
    const [ dataList, setDataList ] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const pageSize = 15; // 페이지당 데이터 개수

      //서버에 코스 목록 조회 요청하기
      const fetchDataList = () => {
        const id = localStorage.getItem('id');
        axios.get(`${ADDRESS}/users/${id}/courses`)
          .then(response => {
            console.log(response.data);
            setDataList(response.data);
            setTotalItemsCount(response.data.length)

          })
          .catch(error => {
            console.log(error);
          });
      };

      useEffect(() => {
        fetchDataList();
      }, [pageNumber]);

      const handlePageChange = (pageNumber) => {
        setPageNumber(pageNumber);
        window.scrollTo(0,0);
      }


      function handleDeleteConfirm(courseId) {
        const result = window.confirm(`${courseId}번 글을 삭제하시겠습니까?`);
        if (result === true) {
         handleDelete(courseId);
        }
        else{ return;}
      }

     const handleDelete = async (courseId) => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
      try {
        const response = await axios.delete(`${ADDRESS}/users/courses/${courseId}`);
        console.log(response);
        
        // 목록을 다시 불러오기 위해 1초 대기 후에 실행
        setTimeout(() => {
          fetchDataList();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };

    //코스 수정 페이지 이동
    function handleModify(courseId) {
      history.push(`/modify?courseId=${courseId}`);
    }
  
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{display:'flex', width:'1200px',margin:'50px'}}>
            <div style={{ width: '250px', margin: '30px 30px' }}>
          <ListGroup>
            <ListGroup.Item action href='/mypage'active={false}>
              마이페이지
            </ListGroup.Item>
            <ListGroup.Item action href='/courses' active={true}>
              내 코스 목록
            </ListGroup.Item>
            <ListGroup.Item action href='/scraps' active={false}>
            내 찜 목록
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
      < div className='background-container'style={{height:'820px'}} >
        <div className='overlay-container'>

        <div className='line'>내 코스 목록
        </div>

        <div>
        <>
            
            <MycourseTable headersName={['글번호','제목','작성자', '좋아요 수','찜 수', '작성일','관리']}>
                
              { dataList ? dataList.map((item, index) => {
                  return (
                  
                    <CommonTableRow key={index}>
                      <CommonTableColumn>{ item.courseId }</CommonTableColumn>
                      <CommonTableColumn>
                          <span onClick={() => history.push(`/postView/${item.courseId}`)}>
                            {item.courseTitle}
                          </span>
                      </CommonTableColumn>
                      <CommonTableColumn>{ item.userId }</CommonTableColumn>
                      <CommonTableColumn> {item.likeCount} </CommonTableColumn>
                      <CommonTableColumn> {item.scrapCount}</CommonTableColumn>
                      <CommonTableColumn>{moment(item.postedDate).format('YYYY-MM-DD')}</CommonTableColumn>
                      <CommonTableColumn> 
                      <button className='reBtn' style={{marginTop:'5px',fontSize:'12px'}}  onClick={() => handleModify(item.courseId)}>수정</button>
                      <button className='delBtn'  onClick={() => handleDeleteConfirm(item.courseId)} style={{marginLeft:'5px',marginTop:'5px',fontSize:'12px'}}>삭제</button>
                      </CommonTableColumn>

                    </CommonTableRow>
                  )
                }) : ''
              }
            </MycourseTable>
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

export default MyPostList