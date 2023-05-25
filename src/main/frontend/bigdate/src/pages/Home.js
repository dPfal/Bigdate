import React, { useEffect, useState } from 'react'
import "./Home.css"
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ADDRESS } from '../Adress';





function Home() {
 
  const [totalSpot,setTotalSpot] = useState([]);
  const [topFiveCongest, setTopFiveCongest] = useState([]);
  const [lowFiveCongest, setLowFiveCongest] = useState([]);
  const [lowFiveDust, setLowFiveDust] = useState([]);
  const [lowFiveSky, setLowFiveSky] = useState([]);
  const [lowFiveTraffic, setLowFiveTraffic] = useState([]);
  const [totalHit, setTotalHit] = useState([]);
  const [todayHit, setTodayHit] = useState([]);
  const [selectedOption, setSelectedOption] = useState('실시간 기반 추천');
  
  const userRole = localStorage.getItem('userRole');
  
  useEffect(() => {
    axios.get(`${ADDRESS}/hotspots`)
   
      .then(response => {
        if(userRole==='ADMIN'){
          window.location.pathname='admin'
        }
        // 서버로부터 받은 데이터 처리
        console.log(response.data);
        // 혼잡도를 기준으로 내림차순 정렬
        const descendingCongest = [...response.data.hotspotDTOArrayList].sort((a, b) => b.congestionLevel- a.congestionLevel);
        // 혼잡도를 기준으로 오름차순 정렬
        const ascendingCongest = [...response.data.hotspotDTOArrayList].sort((a, b) => a.congestionLevel - b.congestionLevel);
        // 미세먼지를 기준으로 오름차순 정렬
        const ascendingDust = [...response.data.hotspotDTOArrayList].sort((a, b) => a.fineDust- b.fineDust);
        // 하늘상태를 기준으로 오름차순 정렬
        const ascendingSky = [...response.data.hotspotDTOArrayList].sort((a, b) => a.skyStatusLevel - b.skyStatusLevel);
        // 교통수준를 기준으로 오름차순 정렬
        const ascendingTraffic = [...response.data.hotspotDTOArrayList].sort((a, b) => b.roadTrafficSpd- a.roadTrafficSpd);
        setTotalHit(response.data.totalHit);
        setTodayHit(response.data.todayHit);
      
        // 상위 5개의 요소를 추출하여 새로운 배열에 저장
        const topFiveCongest = descendingCongest.slice(0, 5);
        // 하위 5개의 요소를 추출하여 새로운 배열에 저장
        const lowFiveCongest = ascendingCongest.slice(0, 5);
        const lowFiveDust = ascendingDust.slice(0, 5);
        const lowFiveSky = ascendingSky.slice(0, 5);
        const lowFiveTraffic = ascendingTraffic.slice(0, 5);
      
        // 전체 목록
        setTotalSpot(response.data.hotspotDTOArrayList);
        // 상태 업데이트
        setTopFiveCongest(topFiveCongest);
        setLowFiveCongest(lowFiveCongest);
        setLowFiveDust(lowFiveDust);
        setLowFiveSky(lowFiveSky);
        setLowFiveTraffic(lowFiveTraffic);
  
  
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
  }, []);

  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // 선택한 값에 따라 필요한 로직 실행
    if (event.target.value === '전체보기') {
      // 전체보기에 대한 로직 실행
      console.log('전체보기');
    } else if (event.target.value === '실시간 기반 추천') {
      renderRanking();
      console.log('실시간 기반 추천');
    }
  };


  const renderRanking = () => {
    if (selectedOption === '전체보기') {
      // 전체보기에 대한 로직
      return (
        <div>
        <div className='rank'>지역 전체</div>  
      
        <div className='card-container' style={{ display: 'flex', flexWrap: 'wrap' }}>
          {totalSpot.map((spot, index) => (
            <div key={spot.hotspotId} style={{  width: '16rem',height:'100%',marginBottom:'20px' }}>
              <Card>
                <Link to={{ pathname: `/hotspots/${spot.hotspotId}`, state: { hotspotName: spot.hotspotName, hotspotId: spot.hotspotId } }}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${spot.hotspotName}.jpg`} />
                </Link>
                <Card.Body style={{ padding: '10px' }}>
                  <Card.Title style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', float:'left',width:'70%' }}>
                      {spot.hotspotName.length > 12 ? (
                        <>
                          {spot.hotspotName.slice(0, 12)}...
                        </>
                      ) : spot.hotspotName}
                    </span>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          )).reduce((rows, card, index) => {
            if (index % 5 === 0) rows.push([]);
            rows[Math.floor(index / 5)].push(card);
            return rows;
          }, []).map((row, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {row}
            </div>
          ))}
        </div>
      </div>
      


      
      );
      
    } else if (selectedOption === '실시간 기반 추천') {
      // 실시간 기반 추천에 대한 로직
      return (
        <div>
        <div className='rank'># 실시간 혼잡도 Top5</div>
      <div className='card-container'>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
      {topFiveCongest.map((topFiveCongest) => (
        <span key={topFiveCongest.hotspot_id} style={{ width: '16rem',height:'100%' }}>
             
          <Card>
               <Link to={{pathname:`/hotspots/${topFiveCongest.hotspotId}`,state: { hotspotName: topFiveCongest.hotspotName,hotspotId:topFiveCongest.hotspotId }}}>
                <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${topFiveCongest.hotspotName}.jpg`} />
                </Link>
                <Card.Body style={{padding:'10px'}}>
                 
              <Card.Title style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
                <span style={{ flex: 1, whiteSpace: 'nowrap',  textOverflow: 'ellipsis' ,float:'left',width:'70%'}}>
                  {topFiveCongest.hotspotName.length > 12 ? (
                    <>
                      {topFiveCongest.hotspotName.slice(0, 12)}...
                    </>
                  ) : topFiveCongest.hotspotName}
                </span>
                <span style={{
                  color: 'white',
                  backgroundColor:
                    topFiveCongest.congestionLevel === 4 ? 'orangered' :
                    topFiveCongest.congestionLevel === 3 ? 'orange' :
                    topFiveCongest.congestionLevel === 2 ? 'gold' :
                    topFiveCongest.congestionLevel === 1 ? 'limegreen' : 'white',
                  padding: '2%',
                  fontSize: '14px',
                  border: '1px solid white',
                  whiteSpace: 'nowrap',
                  borderRadius: '5px',
                  marginLeft: '2px',
                  float:'right'                
                }}>
                  {topFiveCongest.congestionLevel === 4 ? '붐빔' :
                    topFiveCongest.congestionLevel === 3 ? '약간 붐빔' :
                    topFiveCongest.congestionLevel === 2 ? '보통' :
                    topFiveCongest.congestionLevel === 1 ? '여유' : ''}
                </span>
              </Card.Title>

   
                </Card.Body>
              </Card>
             
            </span>
      ))}</div>
      </div>

        <div className='rank'># 실시간 한적한 곳 Top5</div>  
        
        <div className='card-container'>
          <div style={{ display: "flex", justifyContent: 'space-between'}}>
        {lowFiveCongest.map((lowFiveCongest) => (
          <span key={lowFiveCongest.hotspotId} style={{ width: '16rem', height: '100%' }}>
               
              <Card>
                 <Link to={{pathname:`/hotspots/${lowFiveCongest.hotspotId}`,state: { hotspotName: lowFiveCongest.hotspotName,hotspotId:lowFiveCongest.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveCongest.hotspotName}.jpg`} />
                  </Link>
              <Card.Body style={{ padding: '10px' }}>
                   
                <Card.Title style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lowFiveCongest.hotspotName.length > 12 ? (
                      <>
                        {lowFiveCongest.hotspotName.slice(0, 12)}...
                      </>
                    ) : lowFiveCongest.hotspotName}
                  </span>
                  <span style={{
                    color: 'white',
                    backgroundColor:
                      lowFiveCongest.congestionLevel === 4 ? 'orangered' :
                      lowFiveCongest.congestionLevel === 3 ? 'orange' :
                      lowFiveCongest.congestionLevel === 2 ? 'gold' :
                      lowFiveCongest.congestionLevel === 1 ? 'limegreen' : 'white',
                    padding: '2%',
                    fontSize: '14px',
                    border: '1px solid white',
                    whiteSpace: 'nowrap',
                    borderRadius: '5px',
                    marginLeft: '2px',
                    float: 'right'     
                  }}>
                    {lowFiveCongest.congestionLevel === 4 ? '붐빔' :
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
        </div>
        

        <div className='rank'># 실시간 미세먼지 없는 곳 Top5</div>  
        
        <div className='card-container'>
          <div style={{ display: "flex", justifyContent: 'space-between' }}>
        {lowFiveDust.map((lowFiveDust) => (
          <span key={lowFiveDust.hotspotId} style={{ width: '16rem', height: '100%' }}>
              <Card>
                 <Link to={{pathname:`/hotspots/${lowFiveDust.hotspotId}`,state: { hotspotName: lowFiveDust.hotspotName,hotspotId:lowFiveDust.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveDust.hotspotName}.jpg`} />
                  </Link>
              <Card.Body style={{ padding: '10px' }}>
                   
                <Card.Title style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lowFiveDust.hotspotName.length > 12 ? (
                      <>
                        {lowFiveDust.hotspotName.slice(0, 12)}...
                      </>
                    ) : lowFiveDust.hotspotName}
                  </span>
                  <span style={{
                    color: 'white',
                    backgroundColor:
                      lowFiveDust.fineDust >= 151 ? 'orangered' :
                      81 <= lowFiveDust.fineDust && lowFiveDust.fineDust <= 150 ? 'orange' :
                      31 <= lowFiveDust.fineDust && lowFiveDust.fineDust <= 80 ? 'gold' :
                      0 <= lowFiveDust.fineDust && lowFiveDust.fineDust <= 30 ? 'limegreen' : 'white',
                    padding: '2%',
                    fontSize: '14px',
                    border: '1px solid white',
                    whiteSpace: 'nowrap',
                    borderRadius: '5px',
                    marginLeft: '2px',
                    float: 'right'         
                  }}>
                    {lowFiveDust.fineDust >= 151 ? '매우나쁨' :
                      81 <= lowFiveDust.fineDust && lowFiveDust.fineDust <= 150 ? '나쁨' :
                      31 <= lowFiveDust.fineDust && lowFiveDust.fineDust <= 80 ? '보통' :
                      0 <= lowFiveDust.fineDust && lowFiveDust.fineDust <= 30 ? '좋음' : ''}
                  </span>
                </Card.Title>
     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
            </div>
        </div>


        <div className='rank'># 실시간 하늘 상태 맑은 곳 Top5</div>  
        
        <div className='card-container'>
          <div style={{ display: "flex", justifyContent: 'space-between' }}>
        {lowFiveSky.map((lowFiveSky) => (
          <span key={lowFiveSky.hotspotId} style={{ width: '16rem', height: '100%' }}>
               
              <Card>
                 <Link to={{pathname:`/hotspots/${lowFiveSky.hotspotId}`,state: { hotspotName: lowFiveSky.hotspotName,hotspotId:lowFiveSky.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveSky.hotspotName}.jpg`} />
                  </Link>
              <Card.Body style={{ padding: '10px' }}>
                   
                <Card.Title style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lowFiveSky.hotspotName.length > 12 ? (
                      <>
                        {lowFiveSky.hotspotName.slice(0, 12)}...
                      </>
                    ) : lowFiveSky.hotspotName}
                  </span>
                      <span style={{
                        color: 'white',
                        backgroundColor: 
                          lowFiveSky.skyStatusLevel === 3 ? 'gray' :
                          lowFiveSky.skyStatusLevel === 2 ? 'skyBlue' :
                          lowFiveSky.skyStatusLevel === 1 ? 'limegreen' : 'white',
                    padding: '2%',
                    fontSize: '14px',
                    border: '1px solid white',
                    whiteSpace: 'nowrap',
                    borderRadius: '5px',
                    marginLeft: '2px',
                    float: 'right'     
                      }}>
                        {lowFiveSky.skyStatusLevel === 3 ? '구름 많음' :
                          lowFiveSky.skyStatusLevel === 2 ? '구름 조금' :
                          lowFiveSky.skyStatusLevel === 1 ? '맑음' : ''}
                      
                    </span>

                  </Card.Title>

     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
            </div>
        </div>

        <div className='rank'><div># 실시간 교통 상태 좋은 곳 Top5</div></div>  
        
        <div className='card-container'>
          <div style={{ display: "flex", justifyContent: 'space-between'}}>
        {lowFiveTraffic.map((lowFiveTraffic) => (
          <span key={lowFiveTraffic.hotspotId} style={{ width: '16rem', height: '100%' }}>
               
             <Card>
                 <Link to={{pathname:`/hotspots/${lowFiveTraffic.hotspotId}`,state: { hotspotName: lowFiveTraffic.hotspotName,hotspotId:lowFiveTraffic.hotspotId}}}>
                  <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${lowFiveTraffic.hotspotName}.jpg`} />
                  </Link>
              <Card.Body style={{ padding: '10px' }}>
                   
                <Card.Title style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lowFiveTraffic.hotspotName.length > 12 ? (
                      <>
                        {lowFiveTraffic.hotspotName.slice(0, 12)}...
                      </>
                    ) : lowFiveTraffic.hotspotName}
                  </span>
                  <span style={{
                    color: 'white',
                    backgroundColor:
                      lowFiveTraffic.roadTrafficSpd && lowFiveTraffic.roadTrafficSpd < 15 ? 'orangered' :
                      15 <= lowFiveTraffic.roadTrafficSpd && lowFiveTraffic.roadTrafficSpd < 25 ? 'orange' :
                      25 <= lowFiveTraffic.roadTrafficSpd ? 'limegreen' : '',
                    padding: '2%',
                    fontSize: '14px',
                    border: '1px solid white',
                    whiteSpace: 'nowrap',
                    borderRadius: '5px',
                    marginLeft: '2px',
                    float: 'right'     
                  }}>
                    {lowFiveTraffic.roadTrafficSpd === '정보 없음' ? '정보 없음' :
                      lowFiveTraffic.roadTrafficSpd && lowFiveTraffic.roadTrafficSpd < 15 ? '정체' :
                      15 <= lowFiveTraffic.roadTrafficSpd && lowFiveTraffic.roadTrafficSpd < 25 ? '서행' :
                      25 <= lowFiveTraffic.roadTrafficSpd ? '원활' : ''}
                  </span>
                </Card.Title>

     
                  </Card.Body>
                </Card>
               
              </span>
            ))}
            </div>
        </div>
         
        </div>
      );
    }
  };

  return (
  <div>
    
      <div className='main_img'>
        <img src="/images/main_img.png" alt="Example" />
      </div>
      <div className='main_img_tag'>
        <span># 실시간 추천</span>
        <span># 데이트 코스</span>
        <span># 날씨</span>
        <span># 분위기</span>
      </div>
    

    <div className='recommand_category'>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <select value={selectedOption} onChange={handleOptionChange} style={{ width: '200px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f7f7f7', fontSize: '14px' }}>
        <option value="전체보기">전체보기</option>
        <option value="실시간 기반 추천">실시간 기반 추천</option>
      </select>
    </div>

     <div>
      {renderRanking()}
      </div>
      <div style={{ display: 'flex', gap: '40px' , justifyContent:'flex-end', fontWeight:'normal'}}>
        <div>total : {totalHit} </div><div>today : {todayHit}</div>
      </div>
     </div>

    
      
 </div> 
 

    
  )
}

export default Home;