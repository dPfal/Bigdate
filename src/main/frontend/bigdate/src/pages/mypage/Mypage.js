import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../components/menu/Menu';
import ListGroup from 'react-bootstrap/ListGroup';
import { PersonCircle } from 'react-bootstrap-icons';
import './Mypage.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ADDRESS } from '../../Adress';





function Mypage() {
  

  const token = localStorage.getItem('token');
  useEffect(() => {
   
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    axios.get(`${ADDRESS}/users/`)
      .then(response => {
        // 서버로부터 받은 데이터 처리
        console.log(response.data);
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
      
  }, []);
  
  


  if (!token) {
    // 토큰이 없는 경우 로그인 페이지로 이동
    alert('로그인이 필요한 서비스 입니다.')

    return null;
  }


  

  return (
    <div>
      <div style={{display:'flex'}}>
      <div style={{width:'250px',margin:'30px 30px'}}>
         <ListGroup defaultActiveKey='/mypage'>
          <ListGroup.Item action href='/mypage'>
            마이페이지
          </ListGroup.Item>
          <ListGroup.Item action href='/courses'>
            내 코스 목록
          </ListGroup.Item>
          <ListGroup.Item action href='/scraps'>
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
        }}>내 정보
      </div>
      <div style={{display:'flex'}}>
      <PersonCircle fontSize={100} style={{margin:'60px 50px'}}color='gray'/>
     <div style={{margin:"40px 20px"}}>
      <div  style={{marginBottom: "10px"}}> 이름 : 이주영</div>
      <div  style={{marginBottom: "10px"}}> 아이디 : 이주영</div>
    
      <div  style={{marginBottom: "10px"}}> 가입일자 : 2023-04-13</div>
      <div  style={{marginBottom: "10px"}}> 내 취향 : 로맨틱한 <button  style={{
                                                                color:"#1E90FF",
                                                                backgroundColor:'white',
                                                                border:'solid',
                                                                borderColor:'#1E90FF',
                                                                borderRadius:'10px',
                                                                borderWidth:'0.5px'
                                                            }}>수정</button></div>
      </div>
      </div>
      <div style={{margin:"50px 50px"}}>
       <button 
       style={{
                color:"red",
                backgroundColor:'white',
                border:'solid',
                borderColor:'red',
                borderRadius:'10px',
                borderWidth:'0.5px'
               }}
       > 
       회원탈퇴
       </button>
      </div>

    </div>    
      </div>
      </div>

    </div>
    
  )
}

export default Mypage;
