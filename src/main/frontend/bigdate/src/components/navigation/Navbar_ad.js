import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-modal';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './Navbar2.css';
import '../login/LoginModal.css';
import { Link, useHistory } from 'react-router-dom';
import { XLg } from 'react-bootstrap-icons';
import { ADDRESS } from '../../Adress';

Modal.setAppElement('#root');

const Navbar_ad=() =>{
    const [userId,setUserId] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
  
    {/**모달 띄우기 상태 */}
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
  
    {/**로그인 상태 */}
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const storedLoginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(storedLoginStatus === 'true');
    }, []);
    
    {/**모달이 오픈되었을 때 모달 오픈 상태 true로 셋팅 */}
    const handleModalOpen = () => {
      setModalIsOpen(true);
    };
  
    {/**모달이 닫혔을 때 모달 오픈 상태 false로 셋팅 */}
    const handleModalClose = () => {
      setModalIsOpen(false);
    };
  
    //로그아웃 확인
    function handleLogoutConfirm() {
      const result = window.confirm(`로그아웃 하시겠습니까?`);
      if (result === true) {
       handleLogout();
      }
      else{ return;}
    }
  
    {/**로그아웃 시 */}
    const handleLogout = () => {
      console.log(isLoggedIn);
      localStorage.removeItem("isLoggedIn")
      setIsLoggedIn(false);
      // 또는 로컬 스토리지에서 삭제
       localStorage.clear();      
      // 로그아웃 후 리다이렉트할 페이지로 이동
      window.location.pathname = '/'
      alert('로그아웃 되셨습니다')
     
    };
  
    
  
    const handleLogin = async (event) => {
      event.preventDefault();
      
      try {
        console.log(JSON.stringify({ userId, password }))
        const response = await axios.post(`${ADDRESS}/login`, {
          userId,
          password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const token = response.data.JWT; // JWT 토큰을 받아옵니다.
        localStorage.setItem('token', token); // 받아온 토큰을 로컬 스토리지에 저장합니다.
        handleModalClose();
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn",'true')
        
        console.log(response)
        if (response.data.userRole=== 'ADMIN') { // 관리자용 페이지로 이동합니다.
         history.push('/admin');}
        
      } catch (error) {
        // 요청이 실패한 경우 처리
          setUserId('')
          setPassword('')
          console.log(error)
          alert(error.response.data);
       
        }
      };


  


  
  return (
    <>
    
      <Navbar collapseOnSelect className='navbar' style={{ justifyContent: 'center'}}>
        <Container id='content'>
          <Navbar.Brand href='/admin' id='logo'>
            그때 그때
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto' style={{marginLeft:'100px'}}>
              <Nav.Link href='/posts'>커뮤니티 관리</Nav.Link>
            </Nav>
            <Nav className='me-auto'>
              <Nav.Link href='/users'>회원 관리</Nav.Link>
            </Nav>
            <Nav className='me-auto'>
              <Nav.Link href='/places'>장소 관리</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link onClick={() => {
               
               if (isLoggedIn) {
                 handleModalClose();
               } else {
                 handleModalOpen();
               }
               
             }}>
                {isLoggedIn ? (
                 <button onClick={handleLogoutConfirm}>로그아웃</button>
               ) : (
                 <button>로그인</button>
               )}
                           
           </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        {/*로그인 모달창 */}
        <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} 
    style={{
        zIndex:10,
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', //모달창 제외한 화면 어둡게
          },
        content: {
          width: '300px', // 모달 내용의 가로 크기
          height: '400px', // 모달 내용의 세로 크기
          margin: 'auto', // 모달 내용을 가운데로 정렬하기 위한 margin
          borderRadius:'20px' //모달창 테두리 

        },
        
       
      }}>

   
<div style={{textAlign:'right'}}>
      <button style={{backgroundColor:'white',padding:'0px'}} onClick={handleModalClose}><XLg/></button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='login' style={{ margin: '0 auto'}}>그때 그때</div>
        
      </div>
            
      <div className='login_button'>

      <div>

        <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

        <div> <input type='text' value={userId}
          onChange={(event) => setUserId(event.target.value)} placeholder='아이디' style={{marginTop:'15px', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}} /></div>

        <div><input type='password' value={password}
          onChange={(event) => setPassword(event.target.value)} placeholder='비밀번호' style={{marginTop:'15px', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}} /></div>

       
        
        <div style={{marginTop:'40px'}}><button type="submit" >로그인</button></div>
        </form>

      </div>

    

      <div style={{marginTop:'30px'}}>
      <Link to='/signup' onClick={handleModalClose}>아직 회원이 아니신가요?</Link>
     
      </div>


      </div>

    </Modal>
    </>
  );
}

export default Navbar_ad;