import React, { useEffect, useState } from 'react';
import "./RegisterPost.css";
import { PlusSquare,DashSquare, ConeStriped} from 'react-bootstrap-icons';
import PlaceForm from '../components/form/PlaceForm';
import axios from 'axios';

function RegistPost() {
  const [inputVal, setInputVal] = useState(''); // 입력창의 값을 상태로 관리
  const [showTextArea, setShowTextArea] = useState(false);
  const [info, setInfo] = useState('');
  const [courseTitle,setCourseTitle] = useState('');
  const [userId,setUserId] = useState('');
  const [numComponents, setNumComponents] = useState(0);
  const [components,setComponents] = useState([]);
  const [placeforms,setPlaceforms] = useState([]);


  const [totalData, setTotalData] = useState({
    courseTitle: '',
    components: [],
    courseInfo: '',
  
  });

  // 컴포넌트 삭제
  const handleDelete = () => {
    setNumComponents(numComponents -1);
    
  };
  
  //컴포넌트 추가
  function handleAddComponent() {
    setNumComponents(numComponents + 1);
  }

  
  const aa = (newReview, key) => {
    // components 배열에서 key와 일치하는 요소를 찾습니다.
    const existingComponentIndex = components.findIndex(component => component.order === key);
  
    if (existingComponentIndex !== -1) {
      // key 값이 이미 존재하는 경우 해당 컴포넌트의 데이터를 업데이트합니다.
      const updatedComponent = {
        ...components[existingComponentIndex],
        ...newReview,
      };
      const updatedComponents = [...components];
      updatedComponents[existingComponentIndex] = updatedComponent;
  
      setComponents(updatedComponents);
    } else {
      // key 값이 존재하지 않는 경우 새로운 컴포넌트를 배열에 추가합니다.
      const newComponent = {
        ...newReview,
        order: key,
      };
      const newComponents = [...components, newComponent];
      setComponents(newComponents);
    }
  };
  
  

  const handleRegister = (event) => {
    if(components.length<1){
      alert('2개 이상 입력하세요')
      return;
    }

    setTotalData({
      courseTitle: courseTitle,
      reviewList: components,
      courseInfo: info,

    
    });

    event.preventDefault();
    sendDataToServer(totalData);
  };


  const sendDataToServer = async (data) => {
    const token = localStorage.getItem('token');
    console.log(data);
    try {
      const response = await axios.post(
        'http://3.38.34.39:8080/users/courses',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  



  return (
    <div className="background-container">
      
    <div className="overlay-container">

    <div style={{
      fontWeight:"bold",
      fontSize:"large",
      marginRight:"40px",
      marginLeft:"40px",
      borderBottom: '1px solid gray'
      }}>코스 등록
    </div>

      <div style={{margin:"20px 40px"}}> 
        제목<input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}
        style={{marginLeft:"10px", width:'600px',height:'30px'}} className='input' />
      </div>
     
     
      {/* 배열에 있는 PlaceForm 컴포넌트들을 렌더링 */}
      {[...Array(numComponents)].map((value, index) => (
        <PlaceForm key={index} order={index + 1} onSubmit={aa} />
      ))}



      <div className='form_add'>
         {/**입력 폼 삭제 */}
        <button onClick={handleDelete} style={{backgroundColor:"white"}}>
          <DashSquare style={{fontSize:'30px',color:"#1E90FF",marginTop:"50px"}}/> 
        </button>
         {/**입력 폼 추가 */}
        <button onClick={handleAddComponent} style={{backgroundColor:"white"}}>
          <PlusSquare style={{fontSize:'30px',color:"#1E90FF",marginTop:"50px"}}/>
        </button>
      </div>    


      <div style={{fontWeight:"bold",fontSize:"large",marginLeft:"40px",marginRight:"40px",borderBottom: '1px solid gray'}}>코스 설명</div>
      <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}  >
      <textarea
            className='input'
            style={{marginTop:"30px",width:'700px'}}
            rows={3}
            cols={90}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="코스 설명을 입력하세요"
      />
      </div>
       <div className='form_add'>
        <button 
          onClick={handleRegister}
          style={{color:"white",
          backgroundColor:"#1E90FF",
          borderRadius:"10px",
          fontSize:"small",
          width:"80px",
          height:"30px",
          marginTop:"20px",
          marginBottom:'10px'
        }}>
            등록
        </button>
      </div>  
      

      </div>
    </div>
  
);
};


export default RegistPost