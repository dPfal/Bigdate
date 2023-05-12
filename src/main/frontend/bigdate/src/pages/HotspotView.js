import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import xml2js from 'xml2js';
import { useState } from 'react';
import './HotspotView.css';
import { ThermometerHalf ,Sun,Cloudy,Wind,Clock} from 'react-bootstrap-icons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import EbayCarousel from '../components/carousel/EbayCarousel';
import { ADDRESS } from '../Adress';
import moment from 'moment';

  // 장소 목록 데이터를 가지고 있는 places 배열을 정의
  const places = [];

function HotspotView() {
 const location = useLocation();
 const { hotspotName,hotspotId} = location.state;
 const [placeList, setPlaceList] = useState([]);



  const [congest, setCongest] = useState('');
  const [temp,setTemp] = useState('');
  const [sensible_temp,setSensibleTemp] = useState('');
  const [uv_level,setUv_level] = useState('');
 
  const[rainper,setRainper] = useState('');
  const[pm10,setPm10] = useState('');
 
  const[air_msg,setAir_msg] = useState('');
  const[traffic_msg,setTraffic_mag]=useState('');
  const[traffic_level,setTraffic_level]=useState('');
  const[traffic_speed,setTraffic_speed]=useState('');
  const[sky,setSky]=useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [data,setData]=useState({});
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  useEffect(() => {
   
  if(!id){return;}
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    axios.get(`${ADDRESS}/users/${id}`)
      .then(response => {
        // 서버로부터 받은 데이터 처리
        console.log(response.data);
        setData(response.data);

      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
      
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        //지역상세정보불러오기
      
        const response = await axios.get(
          `http://openapi.seoul.go.kr:8088/55526953736a6a793633725870596b/xml/citydata/1/5/${hotspotName}`
        );

        // XML 데이터를 JSON 형식으로 변환
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(response.data, (err, result) => {
          const jsonResult = JSON.stringify(result);
          const jsonData = JSON.parse(jsonResult);

          // AREA_NM 태그의 값을 가져옴
        
          const congest = jsonData["SeoulRtd.citydata"].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_CONGEST_LVL;
          const temp = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.TEMP;
          const sensible_temp = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.SENSIBLE_TEMP;
          const uv_level = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.UV_INDEX;
          const rainper = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.PCP_MSG;
          const pm10 = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.PM10;
          const sky = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.FCST24HOURS.FCST24HOURS[0].SKY_STTS;
          const air_msg = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.AIR_MSG;
          const traffic_msg=jsonData["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_MSG;
          const traffic_level=jsonData["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_IDX;
          const traffic_speed=jsonData["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_SPD;
          
         
          setTemp(temp);
          setSensibleTemp(sensible_temp);
          setUv_level(uv_level);
          setRainper(rainper);
          setPm10(pm10);
          setSky(sky);
          setAir_msg(air_msg);
          setCongest(congest);
          setTraffic_mag(traffic_msg);
          setTraffic_level(traffic_level);
          setTraffic_speed(traffic_speed);
      
        });
          //장소목록불러오기
          const place_list =await axios.get(`${ADDRESS}/hotspots/${hotspotId}`);
        
          setPlaceList(place_list.data);

          //로드완료시
          setIsLoading(false);
         
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div style={{display:'flex',justifyContent:'center',marginTop:'200px'}}><h3>Loading...</h3></div>;
  }
 
  // 카테고리 코드가 음식점인 데이터만 추출
  const filterRE = placeList.filter(function(place) {
    return place.categoryGroupCode === 'RE';
  });
  // 카테고리 코드가 카페인 데이터만 추출
  const filterCA = placeList.filter(function(place) {
    return place.categoryGroupCode === 'CA';
  });
  // 카테고리 코드가 놀거리인 데이터만 추출
  const filterAT = placeList.filter(function(place) {
    return place.categoryGroupCode === 'AT';
  });

  // 카테고리 '힙한'인 데이터만 추출
  const filterHIP = placeList.filter(function(place) {
    return place.placeMood === '힙한';
  });

   // 카테고리 '로맨틱한'인 데이터만 추출
   const filterROMANTIC = placeList.filter(function(place) {
    return place.placeMood === '로맨틱한';
  });

   // 카테고리 '힐링'인 데이터만 추출
   const filterHEALING = placeList.filter(function(place) {
    return place.placeMood === '힐링';
  });

    // 카테고리 '레트로'인 데이터만 추출
    const filterRETRO = placeList.filter(function(place) {
      return place.placeMood === '레트로';
    });

    // 카테고리 '활동적인'인 데이터만 추출
    const filterACTIVE = placeList.filter(function(place) {
      return place.placeMood === '활동적인';
    });
    
    const tags = ['#로맨틱한', '#활동적인', '#힐링', '#힙한', '#레트로'];
    let filteredPlaces;
    if (data.userMood === '로맨틱한') {
      filteredPlaces = filterROMANTIC;
    } else if (data.userMood === '활동적인') {
      filteredPlaces = filterACTIVE;
    } else if (data.userMood === '힐링') {
      filteredPlaces = filterHEALING;
    } else if (data.userMood === '힙한') {
      filteredPlaces = filterHIP;
    } else if (data.userMood === '레트로') {
      filteredPlaces = filterRETRO;
    }


    if (data.userMood) {
      const index = tags.indexOf(`#${data.userMood}`);
      if (index > -1) {
        tags.splice(index, 1);
      }
      tags.unshift(`#${data.userMood}`);
    }


    const renderTag = (tag) => {
      if (tag === `#${data.userMood}`) {
        return (
          <div key={tag}>
            <div className='tag' style={{backgroundColor:'#1E90FF',color:'white',width:'400px'}}>회원님을 위한 {tag} 분위기의 장소 추천해요!</div>
            <div style={{backgroundColor:'white',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
              <EbayCarousel places={filteredPlaces} />
            </div>
          </div>
        );
      } else {
        let filter;
        if (tag === '#로맨틱한') {
          filter = filterROMANTIC;
        } else if (tag === '#활동적인') {
          filter = filterACTIVE;
        } else if (tag === '#힐링') {
          filter = filterHEALING;
        } else if (tag === '#힙한') {
          filter = filterHIP;
        } else if (tag === '#레트로') {
          filter = filterRETRO;
        }
        return (
          <div key={tag}>
            <div className='tag'>{tag}</div>
            <div style={{backgroundColor:'white',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
              <EbayCarousel places={filter} />
            </div>
          </div>
        );
      }
    };

  return (
    <div className="background-container" style={{backgroundColor:'#f5f5f5'}}>
      
    <div className="overlay-container">
<div>
<div className='toCenter' style={{fontSize:'25px',fontWeight:'bold'}}><Clock style={{marginRight:'10px'}}/>{moment().format('YYYY-MM-DD HH:mm')}</div>
  <div className='toCenter' >
         <div className='hotspot_title'>{hotspotName}의 실시간 정보</div>
  </div>      
  
         <div className='row-1'> 
            <img src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${hotspotName}.jpg`} width="25%"/>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className='row-1_content'>실시간 혼잡도는<span
                style={{
                  fontWeight:"bold",
                  marginLeft:'10px',
                  color:'white',
                  padding: "4px",
                  borderRadius: "5px",
                  backgroundColor:
                        congest === "여유"
                      ? "limegreen"
                      : congest === "보통"
                      ? "gold"
                      : congest === "약간 붐빔"
                      ? "orange"
                      : congest === "혼잡"
                      ? "red"
                      : '',
                }}
              >
                {congest} 
              </span>&nbsp; 입니다.</div>
                <div>날씨/환경</div>
                <div className='row-1_content'><ThermometerHalf style={{color:"red",fontSize:"25px"}}/> {temp} ℃</div>
                <div className='row-1_content'>체감온도  {sensible_temp} ℃</div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <div className='row-1_content2'><Wind style={{color:"gray",fontSize:"25px"}}/><br/>미세먼지<br/><div className='weather'>{pm10}㎍/m³</div></div>
                <div className='row-1_content2'><Cloudy style={{color:"skyblue",fontSize:"25px"}}/><br/>하늘상태<br/><div className='weather'>{sky}</div></div>
                <div className='row-1_content2'><Sun style={{color:"orange",fontSize:"25px"}}/><br/>자외선지수<br/><div className='weather'>{uv_level}</div></div>
                </div>
            </div>
         </div>
         <div  className="row-2"> 
            <div>
            <div >교통</div>
            <div style={{width:"300px",backgroundColor:"white",marginTop:"2%",height:"120px",paddingTop:"15px",}}>
            <div className='row-2_content'>
              <div style={{paddingTop:'4px'}}>도로 소통 단계</div> 
              <span
                style={{
                  height:'25px',
                  fontWeight: "bold",
                  marginLeft: "10px",
                  backgroundColor:
                    traffic_level === "원할"
                      ? "green"
                      : traffic_level === "서행"
                      ? "orange"
                      : traffic_level === "정체"
                      ? "red"
                      : '',
                  color: "white",
                  padding: "4px",
                  borderRadius: "5px",
                }}
              >
                {traffic_level}
              </span>
            </div>

            <div className='row-2_content'>
              평균 주행 속도는
              <span
                style={{
                  fontWeight:"bold",
                  marginLeft:'10px',
                  color:
                    traffic_level === "원할"
                      ? "green"
                      : traffic_level === "서행"
                      ? "orange"
                      : traffic_level === "정체"
                      ? "red"
                      : '',
                }}
              >
                {traffic_speed} km/h&nbsp; 
              </span>
              입니다.
            </div>
            </div>
            
            </div>

            <div>
            <div style={{marginLeft:"5%"}}>그때그때 소식</div>
            <div style={{width:"450px", marginLeft:"5%",}}>
            <div className='row-1_content' id='row-2_content' >{traffic_msg}</div>
            <div className='row-1_content' id='row-2_content'>{air_msg}</div>
            <div className='row-1_content' id='row-2_content'>{rainper}</div>
            </div>
            </div>
         </div>

         <div style={{marginTop:'50px'}}>
          {tags.map((tag) => renderTag(tag))}
         </div>

         <div >
          <div className='tag'> # 음식점</div>
          <div style={{backgroundColor:'white',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={filterRE} />
          </div>
         </div>

         <div >
          <div className='tag'> # 카페</div>
          <div style={{backgroundColor:'white',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={filterCA} />
          </div>
         </div>

         <div >
          <div className='tag'> # 놀거리</div>
          <div style={{backgroundColor:'white',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={filterAT} />
          </div>
         </div>
         </div></div>
  </div>
         );
}

export default HotspotView
