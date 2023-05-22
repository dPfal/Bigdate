import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { GeoAltFill, Star, StarFill} from 'react-bootstrap-icons';
import { KakaoMap, MapMarker } from 'react-kakao-maps';

import { HandThumbsUp,HeartFill,PersonCircle } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ADDRESS } from '../../../Adress';

const { kakao } = window



const PlaceView_ad = (props) => {
  const history = useHistory();
  const placeId = props.match.params.id;
  const [sortOption, setSortOption] = useState(""); 
  const[place,setPlace]=useState('');

  const [reviews, setReviews] = useState(place.reviewList); 
  const [isDeleted, setIsDeleted] = useState(false); 
  const [update,setUpdate]=useState({});


  useEffect(() => {
    axios.get(`${ADDRESS}/places/${placeId}`)
    .then(response => {
      console.log(response);
      const place =setPlace(response.data);
      const sortOption=setSortOption(response.data.placeMood);
      console.log(place);
      
      const container = document.getElementById('myMap');
      
      // options 객체의 center 속성 값을 장소의 좌표로 변경
      const options = {
        center: new kakao.maps.LatLng(response.data.placeY, response.data.placeX),
        level: 3,
      };
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const map = new kakao.maps.Map(container, options);
  
      function displayMarker() {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(response.data.placeY, response.data.placeX),
        });
  
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + response.data.placeName + '</div>');
          infowindow.open(map, marker);
        });
      }
      
      displayMarker();
    })
    .catch(error => {
      console.log(error);
    });
  }, [placeId,isDeleted]);
  

 
 //해당 코스 상세 뷰로 이동
  const handleClick = (courseid) => {
    // 이동할 페이지의 URL을 설정합니다.
    const url = `/postViewAd/${courseid}`;

    // 페이지 이동을 수행합니다.
    window.location.href=url;
  };

  //셀렉트박스 분위기 수정
  const handleSortOptionChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
   
  };


  const handleUpdatePlaceMood = async ( placeMood) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    try {
      const response = await axios.patch(`${ADDRESS}/admin/places/${placeId}?placeMood=${placeMood}`);
      console.log(response);
      alert('수정되었습니다.')
    } catch (error) {
      console.error(error);
    }
  };

  function handleDeleteConfirm(placeSequence,placeId,courseId) {
   
    
      handleDelete(placeSequence, placeId, courseId)
        .then(() => setIsDeleted(true))
        .catch(error => console.log(error));
    
  }

  const handleDelete = async (placeSequence, placeId, courseId) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    const requestData = {
      courseId: courseId,
      reviewList: [
        {
          placeSequence: placeSequence,
          placeId: placeId
        }
      ]
    };
    console.log(requestData);
  
    try {
      // 숨기기
      const response = await axios.patch(`${ADDRESS}/admin/reviews`, requestData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (isDeleted) {
      // isDeleted 상태가 변경되었을 때 실행되는 부분
      if (update) {
        // 서버 요청이 정상적으로 처리되었을 때
        setIsDeleted(false); // isDeleted 상태를 다시 false로 업데이트하여 UI 갱신
      }
    }
  }, [isDeleted]);
   // 로딩이 완료되면 데이터를 화면에 렌더링
   
   return (
    <div className="background-container">
      
       <div className="overlay-container" style={{ padding: '30px 150px 30px 150px' }}>

      <div className='line'>{place.placeName} <StarFill style={{color:'orange',marginBottom:'5px'}}/>({place.score})
  
        </div>

             <div style={{marginLeft:'40px',marginTop:'3%',marginBottom:'3%'}}>
                <select value={sortOption} onChange={ handleSortOptionChange}>

                <option value='힙한' selected={sortOption === '힙한'}>힙한</option>
                <option value='로맨틱한' selected={sortOption === '로맨틱한'}>로맨틱한</option>
                <option value='활동적인' selected={sortOption === '활동적인'}>활동적인</option>
                <option value='레트로' selected={sortOption === '레트로'}>레트로</option>
                <option value='힐링' selected={sortOption === '힐링'}>힐링</option>
                </select>

                <button className='reBtn'style={{marginLeft:'1%'}} onClick={()=>handleUpdatePlaceMood(sortOption)}>수정</button>
            </div>


        <div style={{display:'flex',paddingLeft:'40px'}}>
          <div>
            <img src={place.imageUrl} 
            style={{
             width:'300px',
             height:'300px',
            }}/></div>
          <div>
            <div style=
               {{
                 borderBottom: '1px solid lightgray',
                 width: '500px',
                 marginLeft: '50px',
                 padding: '10px'
               }}>
               <GeoAltFill style={{ color: '#3163C9', fontSize: '20px' }} />
               {place.addressName}</div>

            <div style=
            {{borderBottom :'1px solid lightgray', 
               width:'500px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>
                {place.categoryName}</div>

            <div style=
            {{borderBottom :'1px solid lightgray', 
               width:'500px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>{place.placePhone}</div>


            <div style=
            {{borderBottom :'1px solid lightgray', 
               width:'500px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px',
              wordWrap: 'break-word'}}><a href={place.placeUrl}>{place.placeUrl}</a></div>
             {place.reviewList && place.reviewList.length > 0 ? <div style=
               {{
                 width: '500px',
                 marginLeft: '50px',
                 marginTop: '10px',
                 padding: '10px',
                 wordWrap: 'break-word',
               }}> 평균 지출 금액 : {place.avgPrice} 원</div> : <div style=
                 {{
                   width: '500px',
                   marginLeft: '50px',
                   marginTop: '10px',
                   padding: '10px',
                   wordWrap: 'break-word'
                 }}> 평균 지출 금액 : 정보 없음</div>}
          </div>
          
        </div>
        
        <div style=
           {{
             margin: '10px', display: 'flex',
             justifyContent: 'center'

           }}>

        <div
        id="myMap"
        style={{
          width: '700px',
          height: '400px',
          margin:'30px',
          zIndex:0
        }}>
       </div>
      </div>






      <div className='line'>"{place.placeName}" 을 포함한 추천 코스 </div>
        <div style={{flexDirection: 'column'}} className='toCenter'>
          {place.courseList && place.courseList.length > 0 ? (
            place.courseList.map((course, index) => (
              <div key={index} className='courseBox' style={{padding:'10px'}}  onClick={() => handleClick(course.courseId)}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{fontSize:'20px'}}>{course.courseTitle}</div>
                  <div>{course.userId}</div>
                </div>
                <div style={{marginfTop:'15px',color:'gray'}}>
                  총 지출 비용  {course.reviewList.reduce((total, review) => total + review.expense, 0)} 원
                </div>
                <div  style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{display:'flex', marginTop:'10px'}}>
                    <div style={{marginLeft:'5px'}}><HandThumbsUp style={{marginRight:'5px'}}/>{course.likeCount}</div>
                    <div style={{marginLeft:'20px'}}><HeartFill style={{color:'red',marginRight:'5px'}}/>{course.scrapCount}</div>
                  </div>
                  <div style={{ marginTop:'10px'}}> {moment(course.postedDate).format('YYYY-MM-DD HH:mm')}</div>
                </div>
              </div>
            ))
          ) : (
            <div className='toCenter' style={{marginTop:'30px'}}>장소가 포함된 코스가 없습니다</div>
          )}
        </div>






        <div className='line' style={{marginTop:'30px'}}>리뷰</div>
        {place.reviewList && place.reviewList.length > 0 ? (
          place.reviewList.map((review,index) => (
            <div className='toCenter'>
              <div style={{marginBottom:'10px'}}>
                <div style={{display:'flex',marginLeft:'80px',marginTop:'10px'}}>
                  <div>{moment(review.postedDate).format('YYYY-MM-DD HH:mm')}</div>
                  <div style={{marginLeft:'10px'}}> 
                    {Array(review.avgScore).fill(<StarFill style={{color:'gold'}}/>)}
                    {Array(5 - review.avgScore).fill(<Star style={{color:'lightgray'}}/>)}
                  </div>
                  <button className='delBtn' style={{marginLeft:'1%'}}
                    onClick={()=>handleDeleteConfirm(review.placeSequence,review.placeId,place.courseList[index].courseId)}>{review.isDel === 1 ? '숨김 취소' : '숨기기'}</button>
                </div>

                <div style={{display:'flex'}}>
                  <div>
                    <div><PersonCircle style={{fontSize:'50px',color:'dimgray'}}/></div>
                    <div style={{textAlign:'center'}}>{review.userId}</div>
                  </div>
                  <div className='reviewBox' style={{fontWeight:'normal'}}>
                    {review.isDel === 1 ?<span className='toCenter' style={{paddingTop:'10px'}}>관리자에 의해 숨김 처리된 후기 입니다.</span> : review.reviewInfo}
                  </div>
                </div>

                <div style={{float:'right'}}>
                  비용 : {review.expense}원
                </div>
              </div>
            </div>
          ))
        ) : isDeleted ? (
          <div className='toCenter' style={{ marginTop: '30px', paddingBottom: '30px' }}>
            아직 작성된 리뷰가 없습니다
          </div>
        ) : (
          <div className='toCenter' style={{marginTop:'30px',paddingBottom:'30px'}}>아직 작성된 리뷰가 없습니다</div>
        )}




        
     
     </div>
   </div>

  );
};

export default PlaceView_ad;