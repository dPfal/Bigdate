import React, { useEffect, useState } from 'react'
import "./Home.css"
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {hotspots} from '../HotspotData';
import axios from 'axios';
import { ADDRESS } from '../Adress';



/** 
axios(
  {
    url: `${process.env.LOCALHOST_ADDRESS}/places`,
    method: 'get'
  }
).then(function (response) {
  console.log(response.data)
});
*/


 

function Home() {
 

  const [topFiveCongest, setTopFiveCongest] = useState([]);
  const [lowFiveCongest, setLowFiveCongest] = useState([]);
  const [lowFiveDust, setLowFiveDust] = useState([]);
  const [lowFiveSky, setLowFiveSky] = useState([]);
  const [lowFiveTraffic, setLowFiveTraffic] = useState([]);
  
  useEffect(() => {
    axios.get(`${ADDRESS}/hotspots`)
      .then(response => {
        // 서버로부터 받은 데이터 처리
        console.log(response.data);
        // 혼잡도를 기준으로 내림차순 정렬
        const descendingCongest = [...response.data].sort((a, b) => b.congestionLevel- a.congestionLevel);
        // 혼잡도를 기준으로 오름차순 정렬
        const ascendingCongest = [...response.data].sort((a, b) => a.congestionLevel - b.congestionLevel);
        // 미세먼지를 기준으로 오름차순 정렬
        const ascendingDust = [...response.data].sort((a, b) => a.pm10- b.pm10);
        // 하늘상태를 기준으로 오름차순 정렬
        const ascendingSky = [...response.data].sort((a, b) => a.skyStatus - b.skyStatus);
        // 교통수준를 기준으로 오름차순 정렬
        const ascendingTraffic = [...response.data].sort((a, b) => a.roadTrafficSpd- b.roadTrafficSpd);
  
        // 상위 5개의 요소를 추출하여 새로운 배열에 저장
        const topFiveCongest = descendingCongest.slice(0, 5);
        // 하위 5개의 요소를 추출하여 새로운 배열에 저장
        const lowFiveCongest = ascendingCongest.slice(0, 5);
        const lowFiveDust = ascendingDust.slice(0, 5);
        const lowFiveSky = ascendingSky.slice(0, 5);
        const lowFiveTraffic = ascendingTraffic.slice(0, 5);
  
        // 상태 업데이트
        setTopFiveCongest(topFiveCongest);
        setLowFiveCongest(lowFiveCongest);
        setLowFiveDust(lowFiveDust);
        setLowFiveSky(lowFiveSky);
        setLowFiveTraffic(lowFiveTraffic);
  
  
        console.log(topFiveCongest);
        console.log(lowFiveCongest);
        console.log(lowFiveDust);
        console.log(lowFiveSky);
        console.log(lowFiveTraffic);
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
  }, []);


  return (
  <div>
    
      <div className='main_img'>
        <img width="100%"  src="/images/main_img.png" alt="Example" />
      </div>
      <div className='main_img_tag'>
        <span># 실시간 추천</span>
        <span># 데이트 코스</span>
        <span># 편리한</span>
      </div>
    

    <div className='recommand_category'>
      
      <div>#실시간 혼잡도 top5</div>  
        
      <div className='card-container'>
      {topFiveCongest.map((topFiveCongest) => (
        <span key={topFiveCongest.hotspot_id}>
             
              <Card style={{ width: '13.5rem',height:'12rem' }}>
               <Link to={{pathname:`/hotspots/${topFiveCongest.hotspotId}`,state: { hotspotName: topFiveCongest.hotspotName,hotspotId:topFiveCongest.hotspotId }}}>
                <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${topFiveCongest.hotspotName}.jpg`} />
                </Link>
                <Card.Body>
                 
                 <Card.Title style={{ fontWeight: 'bold' ,fontSize:'14px'}}>{topFiveCongest.hotspotName}
                 <span style={{
                  color:topFiveCongest.congestionLevel === 2 ? 'black' :'white',
                  backgroundColor: topFiveCongest.congestionLevel === 4 ? 'red' :
                    topFiveCongest.congestionLevel === 3 ? 'orange' :
                      topFiveCongest.congestionLevel === 2 ? 'yellow' :
                        topFiveCongest.congestionLevel === 1 ? 'green' : 'white'
                }}>
                  {topFiveCongest.congestionLevel === 4 ? '혼잡' :
                    topFiveCongest.congestionLevel === 3 ? '약간 붐빔' :
                      topFiveCongest.congestionLevel === 2 ? '보통' :
                        topFiveCongest.congestionLevel === 1 ? '여유' : ''}
                </span>
                </Card.Title>
   
                </Card.Body>
              </Card>
             
            </span>
          ))}
      </div>

      <div>#실시간 한적한 곳 top5</div>  
        
        <div className='card-container'>
        {lowFiveCongest.map((lowFiveCongest) => (
          <span key={lowFiveCongest.hotspotId}>
               
                <Card style={{ width: '13.5rem',height:'12rem' }}>
                 <Link to={{pathname:`/hotspots/${lowFiveCongest.hotspotId}`,state: { hotspotName: lowFiveCongest.hotspotName,hotspotId:lowFiveCongest.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveCongest.hotspotName}.jpg`} />
                  </Link>
                  <Card.Body>
                   
                   <Card.Title style={{ fontWeight: 'bold' ,fontSize:'14px'}}>{lowFiveCongest.hotspotName}
                   <span style={{
                      color:lowFiveCongest.congestionLevel === 2 ? 'black' :'white',
                      backgroundColor: lowFiveCongest.congestionLevel === 4 ? 'red' :
                        lowFiveCongest.congestionLevel === 3 ? 'orange' :
                        lowFiveCongest.congestionLevel === 2 ? 'yellow' :
                            lowFiveCongest.congestionLevel === 1 ? 'green' : 'white'
                    }}>
                      {lowFiveCongest.congestionLevel === 4 ? '혼잡' :
                        lowFiveCongest.congestionLevel === 3 ? '약간 붐빔' :
                          lowFiveCongest.congestionLevel === 2 ? '보통' :
                            lowFiveCongest.congestionLevel === 1 ? '여유' : ''}
                    </span>
                  </Card.Title>
     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
        </div>
        

        <div>#실시간 미세먼지 맑은 곳 top5</div>  
        
        <div className='card-container'>
        {lowFiveDust.map((lowFiveDust) => (
          <span key={lowFiveDust.hotspotId}>
               
                <Card style={{ width: '13.5rem',height:'12rem' }}>
                 <Link to={{pathname:`/hotspots/${lowFiveDust.hotspotId}`,state: { hotspotName: lowFiveDust.hotspotName,hotspotId:lowFiveDust.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveDust.hotspotName}.jpg`} />
                  </Link>
                  <Card.Body>
                   
                   <Card.Title style={{ fontWeight: 'bold' ,fontSize:'14px'}}>{lowFiveDust.hotspotName}
                   <span>
                     
                  </span>
                  </Card.Title>
     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
        </div>


        <div>#실시간 하늘 상태 맑은 곳 top5</div>  
        
        <div className='card-container'>
        {lowFiveSky.map((lowFiveSky) => (
          <span key={lowFiveSky.hotspotId}>
               
                <Card style={{ width: '13.5rem',height:'12rem' }}>
                 <Link to={{pathname:`/hotspots/${lowFiveSky.hotspotId}`,state: { hotspotName: lowFiveSky.hotspotName,hotspotId:lowFiveSky.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveSky.hotspotName}.jpg`} />
                  </Link>
                  <Card.Body>
                   
                   <Card.Title style={{ fontWeight: 'bold' ,fontSize:'14px'}}>{lowFiveSky.hotspotName}
                   <span>
                     
                  </span>
                  </Card.Title>
     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
        </div>

        <div>#실시간 교통 상태 좋은 곳 top5</div>  
        
        <div className='card-container'>
        {lowFiveTraffic.map((lowFiveTraffic) => (
          <span key={lowFiveTraffic.hotspotId}>
               
                <Card style={{ width: '13.5rem',height:'12rem' }}>
                 <Link to={{pathname:`/hotspots/${lowFiveTraffic.hotspotId}`,state: { hotspotName: lowFiveTraffic.hotspotName,hotspotId:lowFiveTraffic.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveTraffic.hotspotName}.jpg`} />
                  </Link>
                  <Card.Body>
                   
                   <Card.Title style={{ fontWeight: 'bold' ,fontSize:'14px'}}>{lowFiveTraffic.hotspotName}
                   <span>
                     
                  </span>
                  </Card.Title>
     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
        </div>

       

    
      
    </div>
    
 </div>
    
  )
}

export default Home;

