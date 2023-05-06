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
  }, [placeId]);
  

 
 //해당 코스 상세 뷰로 이동
  const handleClick = (courseid) => {
    // 이동할 페이지의 URL을 설정합니다.
    const url = `/postView/${courseid}`;

    // 페이지 이동을 수행합니다.
    window.location.href=url;
  };

  //셀렉트박스 분위기 수정
  const handleSortOptionChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
   
  };



 //const totalExpense = place.courseList.reviewList.reduce((acc, review) => acc + review.expense, 0);
 

   // 로딩이 완료되면 데이터를 화면에 렌더링
   return (
    <div className="background-container">
      
      <div className="overlay-container">

      <div className='line'>{place.placeName} <StarFill style={{color:'orange',marginBottom:'5px'}}/>({place.score})
  
        </div>

             <div style={{marginLeft:'8%',marginTop:'3%',marginBottom:'3%'}}>
                <select value={sortOption} onChange={ handleSortOptionChange}>

                <option value='힙한' selected={sortOption === '힙한'}>힙한</option>
                <option value='로맨틱한' selected={sortOption === '로맨틱한'}>로맨틱한</option>
                <option value='활동적인' selected={sortOption === '활동적인'}>활동적인</option>
                <option value='레트로' selected={sortOption === '레트로'}>레트로</option>
                <option value='힐링' selected={sortOption === '힐링'}>힐링</option>
                </select>

                <button className='reBtn'style={{marginLeft:'1%'}}>수정</button>
            </div>


        <div style={{display:'flex',paddingLeft:'60px'}}>
          <div>
            <img src={place.imageUrl} 
            style={{
             width:'300px',
             height:'300px',
            }}/></div>
          <div>
            <div style=
            {{borderBottom :'1px solid lightgray', 
              width:'300px',
              marginLeft:'50px',
              padding:'10px'}}>
                <GeoAltFill style={{color:'#3163C9',fontSize:'20px'}}/>
                {place.addressName}</div>

            <div style=
            {{borderBottom :'1px solid lightgray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>
                {place.categoryName}</div>

            <div style=
            {{borderBottom :'1px solid lightgray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>{place.placePhone}</div>


            <div style=
            {{borderBottom :'1px solid lightgray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px',
              wordWrap: 'break-word'}}><a href={place.placeUrl}>{place.placeUrl}</a></div>
          </div>
          
        </div>
        
        <div style=
        {{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>

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
                  총 지출 비용   {course.totalExpense} 원
                </div>
                <div  style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{display:'flex', marginTop:'10px'}}>
                    <div style={{marginLeft:'5px'}}><HandThumbsUp/>{course.likeCount}</div>
                    <div style={{marginLeft:'20px'}}><HeartFill style={{color:'red'}}/>{course.scrapCount}</div>
                  </div>
                  <div style={{ marginTop:'10px'}}> {moment(course.postedDate).format('YYYY-MM-DD HH:mm')}</div>
                </div>
              </div>
            ))
          ) : (
            <div className='toCenter' style={{marginTop:'30px'}}>장소가 포함된 코스가 없습니다</div>
          )}
        </div>






        <div className='line'>리뷰</div>
          {place.reviewList && place.reviewList.length > 0 ? (
            place.reviewList.map((review) => (
              <div className='toCenter'>
                <div>
                  <div style={{display:'flex',marginLeft:'80px',marginTop:'10px'}}>
                    <div> {moment(review.postedDate).format('YYYY-MM-DD HH:mm')}</div>
                    <div style={{marginLeft:'10px'}}> 
                      {Array(review.avgScore).fill(<StarFill style={{color:'gold'}}/>)}
                      {Array(5 - review.avgScore).fill(<Star style={{color:'lightgray'}}/>)}
                    </div>
                    <button className='delBtn' style={{marginLeft:'1%'}}>삭제</button>
                  </div>

                  <div style={{display:'flex'}}>
                    <div>
                      <div><PersonCircle style={{fontSize:'50px',color:'dimgray'}}/></div>
                      <div style={{textAlign:'center'}}>{review.userId}</div>
                    </div>
                    <div className='reviewBox'>
                      {review.reviewInfo}
                    </div>
                  </div>

                  <div style={{float:'right'}}>
                    비용 : {review.expense}원
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='toCenter' style={{marginTop:'30px',paddingBottom:'30px'}}>아직 작성된 리뷰가 없습니다</div>
          )}



        
     
     </div>
   </div>

  );
};

export default PlaceView_ad;