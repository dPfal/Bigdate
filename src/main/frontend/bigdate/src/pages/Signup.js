import axios from 'axios';
import React, { useState } from 'react'
import { Display } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { ADDRESS } from '../Adress';

import './Signup.css';

function Signup() {
    const [userName,setUserName] = useState('');
    const [userId,setUserId] = useState('');
    const [password,setPassword] = useState('');
    const [userMood,setuserMood] = useState('');
    const [isUserIdValid,setIsUserIdValid]=useState(false);
    const history = useHistory();


    //아이디중복체크
    const overlapCheack=async (event)=>{
      event.preventDefault();
      try {
        console.log(JSON.stringify({ userId }))
        const response = await axios.get(`${ADDRESS}/id`, {
          params: { userId: userId }
         
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(response.data==true){
          alert('사용 하실 수 있는 아이디입니다.')
          setIsUserIdValid(true); // 아이디 중복 체크 결과를 저장합니다.
        }else{
          alert('이미 가입된 아이디입니다.')
          setIsUserIdValid(false); // 아이디 중복 체크 결과를 저장합니다.
          setUserId('')

        }
        
      
      } catch (error) {
        console.error(error);
      }
    };
  



  const handleSignup = async (event) => {
    event.preventDefault();
    if (!userId || !password || !userName || !userMood) {
      alert('사용자 정보를 빠짐없이 입력해주세요.');
      return;
    }

    if (!isUserIdValid) {
      alert('아이디 중복 체크를 해주세요.');
      return;
    }

    try {
      console.log(JSON.stringify({ userId, password,userName ,userMood }))
      const response = await axios.post(`${ADDRESS}/join`, {
        userId,
        password,
        userName,
        userMood,
 
      }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      alert(response.data);
      history.push('/')
    } catch (error) {
      console.error(error);
    }
  };


    //입력받은 취향 변경
    const handleMoodChange = (event) => {
      setuserMood(event.target.value); // 선택한 값을 상태에 저장
      
    }
      

  return (
    <div className="background-container" style={{height:'550px'}}>
      
        <div className="overlay-container">

            <div style={{
            fontWeight:"bold",
            fontSize:"large",
            marginRight:"40px",
            marginLeft:"40px",
            borderBottom: '1px solid gray'
            }}>회원가입
            </div>

            <form onSubmit={handleSignup}>
                <div style={{textAlign:'center', marginTop:'70px'}}>
                <div><input value={userName} onChange={(event) => setUserName(event.target.value)} className='input' type='text' placeholder='이름을 입력하세요.'></input></div>
                <div><input value={userId} onChange={(event) => setUserId(event.target.value)} className='input' type='text' placeholder='아이디를 입력하세요.' style={{width:'320px'}}></input>
                <span style={{marginLeft:'20px'}}><button onClick={overlapCheack}>중복확인</button></span></div>
                <div><input value={password} onChange={(event) => setPassword(event.target.value)} className='input' type='password' placeholder='비밀번호를 입력히세요.'></input></div>
                   

                    <div style={{marginTop:'30px',color:'#1E90FF',fontWeight:'bold'}}>마음에 드는 데이트 취향을 선택하세요</div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
                    
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
                </div>

                <div style={{marginTop:'40px'}}><button   style={{marginTop:'15px', padding:'10px', borderRadius:'5px', border:'1px solid #ccc',width:'400px'}} 
                type="submit" >회원가입</button></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
