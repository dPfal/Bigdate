import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { GeoAltFill, StarFill} from 'react-bootstrap-icons';
import { KakaoMap, MapMarker } from 'react-kakao-maps';
import { Link } from 'react-router-dom';

const { kakao } = window



const PlaceView = (props) => {
  const placeId = props.match.params.id;
  const courses = ['코스1', '코스2', '코스3'];
  const[place,setPlace]=useState('');

  useEffect(() => {
    axios.get(`http://3.38.34.39:8080/places/${placeId}`)
    .then(response => {
      console.log(response);
      const place =setPlace(response.data);
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
  
  
 
   // 로딩이 완료되면 데이터를 화면에 렌더링
   return (
    <div className="background-container">
      
      <div className="overlay-container">

      <div style={{
        fontWeight:"bold",
        fontSize:"large",
        marginRight:"40px",
        marginLeft:"40px",
        borderBottom: '1px solid gray'
        }}>{place.placeName} <StarFill style={{color:'orange',marginBottom:'5px'}}/>(별점)

        </div>
        <div className='tag' style={{margin:'20px 20px'}}> # {place.placeMood}</div>
        <div style={{display:'flex',paddingLeft:'60px'}}>
          <div>
            <img src={place.imageUrl} 
            style={{
             width:'300px',
             height:'300px'
            }}/></div>
          <div>
            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              padding:'10px'}}>
                <GeoAltFill style={{color:'#3163C9',fontSize:'20px'}}/>
                {place.addressName}</div>

            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>
                {place.categoryName}</div>

            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>{place.placePhone}</div>


            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}><a href={place.placeUrl}>{place.placeUrl}</a></div>
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

        <div style={{
        fontWeight:"bold",
        fontSize:"large",
        marginRight:"40px",
        marginLeft:"40px",
        borderBottom: '1px solid gray'
        }}>장소명을 포함한 추천 코스 

        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection: 'column'}}>
          {courses.map((course, index) => (
            <div key={index} style={{borderColor:'gray',borderStyle:'solid',borderWidth:'1px',borderRadius:'5px',width:'700px',height:'100px',marginTop:'20px'}}>
              {course}
            </div>
          ))}
        </div>

        <div style={{
        fontWeight:"bold",
        fontSize:"large",
        margin:'10px 40px',
        borderBottom: '1px solid gray'
        }}>리뷰

        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style=
          {{borderColor:'gray',
            borderStyle:'solid',
            borderWidth:'1px',
            borderRadius:'20px',
            width:'700px',
            height:'100px',
            marginTop:'20px'}}>
            코스1 map함수 써서
            
          </div>
        </div>

        
     
     </div>
   </div>

  );
};

export default PlaceView;