import React, { useEffect, useState } from 'react';
import "./RegisterPost.css";
import { PlusSquare,DashSquare, ConeStriped} from 'react-bootstrap-icons';
import PlaceForm from '../components/form/PlaceForm';
import axios from 'axios';

import { useHistory, useLocation } from 'react-router-dom';
import { ADDRESS } from '../Adress';



function ModifyPost() {
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get('courseId');
  
  const [inputVal, setInputVal] = useState(''); // 입력창의 값을 상태로 관리
  const [showTextArea, setShowTextArea] = useState(false);
  const [info, setInfo] = useState('');
  const [courseTitle,setCourseTitle] = useState('');
  const [userId,setUserId] = useState('');
  const [numComponents, setNumComponents] = useState(0);
  const [components,setComponents] = useState([]);
  const [placeforms,setPlaceforms] = useState([]);
  const history=useHistory();
  const [courseInfo,setCourseInfo]=useState({});
  const [review,setReview]=useState([]);


  useEffect(() => {
    const url =  `${ADDRESS}/courses/${courseId}`;
    axios.get(url)
      .then(response => {
       
        console.log(response.data);

        setReview(response.data.reviewList);

        setCourseTitle(response.data.courseTitle);
        setInfo(response.data.courseInfo);
        
        const Components = response.data.reviewList.map((review, index) => ({
          placeId:review.placeDTO.placeId,
          placeName: review.placeDTO.placeName,
          avgScore: review.avgScore,
          reviewInfo: review.reviewInfo,
          expense: review.expense,
          placeSequence: index + 1,
        }));
        setComponents(Components);
       console.log(components)
       
    
      })
  }, [courseId]);

 

  const [totalData, setTotalData] = useState({
    courseTitle: '',
    components: [],
    courseInfo: '',
  
  });

  // 마지막 컴포넌트를 삭제하는 함수
  const handleDelete = () => {
    setComponents(prevComponents => prevComponents.slice(0, -1));
  };
    
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

  console.log(components)
  

  const handleModify = async (event) => {
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
    const isConfirmed = window.confirm('수정하시겠습니까??');
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
        history.push('/courses');
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
   
  };
  
 
  
  const sendDataToServer = async (data, token) => {
    try {
      const response = await axios.put(
        `${ADDRESS}/users/courses/${courseId}`,
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

    <div className='line'>코스 수정</div>

      <div style={{margin:"20px 40px"}}> 
        제목<input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}
        style={{marginLeft:"10px", width:'600px',height:'30px'}} className='input' />
      </div>
     
     
      {/* 배열에 있는 PlaceForm 컴포넌트들을 렌더링 */}
      {[...components].map((component, index) => (
        <PlaceForm key={index} order={index+1} onSubmit={aa}
        placeId={component.placeId} expense={component.expense} placeName={component.placeName}
        reviewInfo={component.reviewInfo} avgScore={component.avgScore}/>
        
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
          onClick={handleModify}
          style={{color:"white",
          backgroundColor:"#1E90FF",
          borderRadius:"10px",
          fontSize:"small",
          width:"80px",
          height:"30px",
          marginTop:"20px",
          marginBottom:'10px'
        }}>
            수정
        </button>
      </div>  
      

      </div>
    </div>
  
);
};


export default ModifyPost