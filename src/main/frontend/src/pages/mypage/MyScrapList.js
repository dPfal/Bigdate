import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { HandThumbsUp,Heart, } from 'react-bootstrap-icons';
import { postList } from '../../Data';
import './Mypage.css'
import MyScrapTable from '../../components/table/MyScrapTable';

function MyPostList() {
    const [ dataList, setDataList ] = useState([]);
  
  
    useEffect(() => {
      setDataList(postList);
    }, [ ])
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

     <div style={{
      fontWeight:"bold",
      fontSize:"large",
      marginRight:"40px",
      marginLeft:"40px",
      height:'50px',
      borderBottom: '1px solid gray'
      }}>내 찜 목록
    </div>
    
    <div >
    <>
        
        <MyScrapTable headersName={['글번호','제목','작성자', '좋아요 수','찜 수', '작성일']}>
            
          { dataList ? dataList.map((item, index) => {
              return (
              
                <CommonTableRow key={index}>
                  <CommonTableColumn>{ item.course_id }</CommonTableColumn>
                  <CommonTableColumn>
                    <Link to={`/postView/${item.course_id}`}>{ item.course_name }</Link>
                  </CommonTableColumn>
                  <CommonTableColumn>{ item.user_id }</CommonTableColumn>
                  <CommonTableColumn><HandThumbsUp style={{ marginRight: "5px" }} />{ item.LikeCount}</CommonTableColumn>
                  <CommonTableColumn> <Heart style={{ marginRight: "5px" }} />{ item.ScrapCount}</CommonTableColumn>
                  <CommonTableColumn>{ item.posted_date}</CommonTableColumn>
                  <CommonTableColumn><button  style={{
                                        color:"red",
                                        backgroundColor:'white',
                                        border:'solid',
                                        borderColor:'red',
                                        borderRadius:'10px',
                                        borderWidth:'0.5px'
                                    }}>삭제</button></CommonTableColumn>
                </CommonTableRow>
              )
            }) : ''
          }
        </MyScrapTable>
      </>
    </div>
    

  </div>    
    </div>
    </div>

  </div>
  
)
}

export default MyPostList
