import React, { useEffect, useState } from 'react';
import "./RegisterPost.css";
import { PlusSquare,DashSquare, ConeStriped} from 'react-bootstrap-icons';
import PlaceForm from '../components/form/PlaceForm';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { ADDRESS } from '../Adress';



function RegisterPost() {
  const [inputVal, setInputVal] = useState(''); // 입력창의 값을 상태로 관리
  const [showTextArea, setShowTextArea] = useState(false);
  const [info, setInfo] = useState('');
  const [courseTitle,setCourseTitle] = useState('');
  const [userId,setUserId] = useState('');
  const [numComponents, setNumComponents] = useState(0);
  const [components,setComponents] = useState([]);
  const [placeforms,setPlaceforms] = useState([]);
  const history=useHistory();


  const [totalData, setTotalData] = useState({
    courseTitle: '',
    components: [],
    courseInfo: '',
  
  });


 //컴포넌트 추가하는 함수 
 const handleAddComponent = () => {
  const newComponent = {
    placeName: '',
    expense: '',
    reviewInfo: '',
    avgScore: '1',
    placeId: '',
    order: components.length > 0 ? components[components.length - 1].order + 1 : 1,
  };
  setComponents([...components, newComponent]);
};


// 컴포넌트 삭제
const handleDelete = () => {
  if (components.length === 0) {
    return; // 배열이 비어있으면 아무 작업도 수행하지 않음
  }
  setComponents(prevComponents => prevComponents.slice(0, -1));
}


  
const aa = (newReview, key) => {
  const existingComponentIndex = components.findIndex((component) => component.order === key);

  if (existingComponentIndex !== -1) {
    const updatedComponent = {
      ...components[existingComponentIndex],
      ...newReview,
    };

    setComponents((prevState) => {
      const updatedComponents = prevState.map((component) =>
        component.order === key ? updatedComponent : component
      );
      return updatedComponents;
    });
  } else {
    const newComponent = {
      ...newReview,
      order: key,
    };
    setComponents((prevState) => {
      const updatedComponents = [...prevState];
      updatedComponents[key - 1] = newComponent;
      return updatedComponents;
    });
  }
};

  
  

  const handleRegister = async (event) => {
    event.preventDefault();

    if(courseTitle===''){
      alert('제목을 입력하세요.');
      return;
    }


    if(info===''){
      alert('코스 설명을 입력하세요.');
      return;
    }

   const hasEmpty = components.some(component => component.expense === '' || component.avgScore === ''||component.reviewInfo===''||component.placeId==='');
    if (hasEmpty) {
      alert('모든 값을 입력 후 확인 버튼을 누르세요.');
      return;
    }
  
    if (components.length < 2) {
      alert('2개 이상 입력하세요.');
      return;
    }

    const isConfirmed = window.confirm('등록하시겠습니까??');
    if (isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const data = {
          courseTitle: courseTitle,
          reviewList: components,
          courseInfo: info,
        };
        console.log(data);
        await setTotalData(data);
        await sendDataToServer(data, token);
        history.push('/post');
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
   
  };
    
 
  
  const sendDataToServer = async (data, token) => {
    try {
      const response = await axios.post(
        `${ADDRESS}/users/courses`,
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
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      localStorage.clear();
      window.location.pathname = "/";
      
    }
  };
  
  



  return (
    <div className="background-container">
      
      <div className="overlay-container" style={{ paddingLeft: '150px', paddingRight: '150px' }}>

    <div className='line'>코스 등록
    </div>

      <div style={{margin:"20px 40px"}}> 
        제목<input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}
        style={{marginLeft:"10px", width:'600px',height:'30px'}} className='input' />
      </div>
     
     
      
      {[...components].map((component, index) => (
        <PlaceForm key={index} order={index+1} onSubmit={aa} />
      ))}



      <div className='form_add'>
         {/**입력 폼 삭제 */}
        <button onClick={() => handleDelete()} style={{backgroundColor:"white"}}>
          <DashSquare style={{fontSize:'30px',color:"#1E90FF",marginTop:"50px"}}/> 
        </button>
         {/**입력 폼 추가 */}
        <button onClick={handleAddComponent} style={{backgroundColor:"white"}}>
          <PlusSquare style={{fontSize:'30px',color:"#1E90FF",marginTop:"50px"}}/>
        </button>
      </div>    


      <div className='line'>코스 설명</div>
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


export default RegisterPost