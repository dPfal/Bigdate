import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { PersonCircle } from 'react-bootstrap-icons';
import './Mypage.css'
import axios from 'axios';
import { ADDRESS } from '../../Adress';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';





function Mypage() {
  
  const [data,setData]=useState({});
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showModal, setShowModal] = useState(false);
  const [userMood,setuserMood] = useState('');
  const history = useHistory();

  
  const handleMoodChange = (event) => {
    setuserMood(event.target.value);
  };


  const handleShow = () => {
    setShow(true);
  }



  useEffect(() => {
   

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    axios.get(`${ADDRESS}/users/${id}`)
      .then(response => {
        // 서버로부터 받은 데이터 처리
        console.log(response.data);
        setData(response.data);
        setuserMood(response.data.userMood);

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

  //회원 탈퇴 확인
  function handleDeleteConfirm(id) {
    const result = window.confirm(`정말 탈퇴하시겠습니까?`);
    if (result === true) {
     handleDelete(id);

    }
    else{ return;}
  }

  //회원 탈퇴
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
    try {
      const response = await axios.delete(`${ADDRESS}/users/${id}`);
      console.log(response.data.message);
      if(response.data.message=='사용자 삭제 완료!'){
      alert(response.data.message);
      localStorage.clear();
      window.location.pathname = '/'}
      else{
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
    

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

       <div className='line'>내 정보
      </div>
      <div style={{display:'flex'}}>
      <PersonCircle fontSize={100} style={{margin:'60px 50px'}}color='gray'/>
     <div style={{margin:"40px 20px"}}>
      <div  style={{marginBottom: "10px"}}> 이름 : {data.userName}</div>
      <div  style={{marginBottom: "10px"}}> 아이디 : {data.userId}</div>
      <div style={{display:'flex'}}>
      <div > 취향 : {data.userMood}</div>
      <button  className='reBtn' onClick={handleShow}style={{marginLeft: "10px",height:'20px'}} >수정</button></div></div>
              <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>내 취향 변경하기</Modal.Title>
                   </Modal.Header>
                    <Modal.Body className='toCenter' style={{textAlign:'center'}}>
                                                                
                      <div>
                        <input type='radio' id='hip' name='mood' value='힙한' onChange={handleMoodChange} style={{display:'none'}} />
                        <label htmlFor='hip'  className={userMood === '힙한' ? 'userMood selected' : 'mood'}>힙한</label>
                      </div>
                        
                      <div>
                      <input type='radio' id='healing' name='mood' value='힐링' onChange={handleMoodChange} style={{display:'none'}} />
                      <label htmlFor='healing' className={userMood === '힐링' ? 'userMood selected' : 'mood'}>힐링</label>
                      </div>
                      
                      <div>
                      <input type='radio' id='retro' name='mood' value='레트로' onChange={handleMoodChange}  style={{display:'none'}} />
                      <label htmlFor='retro' className={userMood === '레트로' ? 'userMood selected' : 'mood'}>레트로</label>
                      </div>
                      
                      <div>
                      <input type='radio' id='romantic' name='mood' value='로맨틱한' onChange={handleMoodChange} style={{display:'none'}} />
                      <label htmlFor='romantic' className={userMood=== '로맨틱한' ? 'userMood selected' : 'mood'}>로맨틱한</label>
                      </div>
                      
                      <div>
                      <input type='radio' id='active' name='mood' value='활동적인' onChange={handleMoodChange} style={{display:'none'}} />
                      <label htmlFor='active' className={userMood=== '활동적인' ? 'userMood selected' : 'mood'}>활동적인</label>
                      </div>

                  </Modal.Body>

                <Modal.Footer>
                  <button onClick={handleClose}>확인</button>
                </Modal.Footer>
              </Modal>
      </div>
     

      
      </div>
      <div style={{margin:"50px 50px",fontSize:'13px'}}>
      <button className='delBtn' onClick={() =>  handleDeleteConfirm(data.id)}>회원탈퇴</button>
      </div>
      </div>
      </div>
    </div>    
    
    
  )
}

export default Mypage;
