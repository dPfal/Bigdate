import React, { useState } from 'react';
import RegistPost from '../../pages/RegisterPost';
import './PlaceForm.css'
import axios from 'axios';
import { ADDRESS } from '../../Adress';



// PlaceForm 컴포넌트 정의
const PlaceForm = (props) => {
  const [reviews, setReviews] = useState([]);
  const [placeName,setPlaceName] = useState(props.placeName??'');
  const [avg_score,setAvg_Score] = useState(props.avgScore??'1');
  const [review_info,setReview_Info] = useState(props.reviewInfo??'');
  const [expense,setExpense] = useState(props.expense??0);
  const [placeId,setPlaceId] = useState(props.placeId??'');

  const [suggestions, setSuggestions] = useState([]); // 검색어 리스트를 저장하는 상태
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);




 const handleAddReview =()=> {
  if (isNaN(expense)) {
    // 숫자가 아닌 경우 경고창을 
    alert("금액은 숫자로 입력해주세요.");
    return;
  }
    const newReview = {
      placeName:placeName,
      placeId: placeId,
      avgScore: avg_score,
      reviewInfo: review_info,
      expense: expense,
      placeSequence: String(props.order)
    };
    const placeSequence=String(props.order)
    props.onSubmit(newReview,placeSequence);
    console.log(newReview);
    
  }

 

  const handleInputChange = async (event) => {
    const value = event.target.value; // 입력값을 가져옴
    setPlaceName(value); // 입력값을 상태에 저장
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(`${ADDRESS}/users/places`, { // 서버로 GET 요청을 보냄
        params: { searchData: value }, // 쿼리스트링으로 검색어를 전달
        headers: { Authorization: `Bearer ${token}` },
      });
     
      console.log(response);
      const data = response.data;
      const placeSuggestions = data.map((place) => ({
        placeName: place.placeName,
        placeId: place.placeId,
      })); // 데이터에서 placeName과 placeId를 추출하여 객체로 생성
  
      setSuggestions(placeSuggestions);
      
    } catch (error) {
      console.error(error);
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        const selectedSuggestion = suggestions[selectedSuggestionIndex];
        setPlaceName(selectedSuggestion.placeName);
        setPlaceId(selectedSuggestion.placeId);
        setSuggestions([]);
      }
    }
  };
  


  return (
    <div>
      <div>
          <div style={{ textAlign: 'center', display: 'flex' }}>
            <div className='placeNum'>{props.order}</div>
                <div className='place_add' style={{ marginBottom:'10px',marginLeft:'10px'}}>
                  장소 검색
                  <input
                  className='input'
                  style={{ marginLeft: '5px',width:'200px',height:'25px' }}
                  type="text"
                  id="myInput"
                  name="myInput"
                  value={placeName}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange} // 입력창의 값이 변경될 때마다 상태 값 업데이트
                  placeholder={placeName} // 상태 값으로 placeholder에 값을 설정
                />
                  {placeName && suggestions.length > 0 && (
                    <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                      {suggestions.map((suggestion, index) => (
                        <li
                          style={{
                            listStyleType: 'none',
                            background: selectedSuggestionIndex === index ? '#1e90ff' : 'transparent',
                          }}
                          key={`${suggestion.placeId}-${index}`}
                          onClick={() => {
                            setPlaceName(suggestion.placeName);
                            setPlaceId(suggestion.placeId);
                            setSuggestions([]);
                          }}
                          onMouseEnter={() => setSelectedSuggestionIndex(index)} // 마우스가 요소 위에 올라갔을 때 인덱스 값을 업데이트
                          onMouseLeave={() => setSelectedSuggestionIndex(-1)} // 마우스가 요소를 벗어났을 때 인덱스 값을 초기화
                        >
                          {suggestion.placeName}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
             </div>
       </div>
       <div>
       <div style={{marginLeft:"40px"}}>
              평점   <select
                        style={{marginTop:"15px",width:"70px"}}
                        value={avg_score}
                        onChange={(e) => setAvg_Score(e.target.value)}
                      >
                  
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"15px"}} >
              <textarea
                rows={3}
                cols={90}
                value={review_info}
                onChange={(e) => setReview_Info(e.target.value)}
                placeholder="리뷰를 입력하세요"
              />
              </div>
            <div style={{marginRight:"90px",display: "flex", justifyContent: "flex-end"}}>
              <div style={{marginTop:"15px"}}>
                총 지출 금액 :
              <input
                type="number"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                placeholder="금액을 입력하세요"
              /> 원
            </div>
            </div>
       
       </div>
       <div style={{marginLeft:'650px', marginTop:'10px'}}>
      <button onClick={handleAddReview} >
        확인
      </button>
      </div>
     
  </div>
  );
}

export default PlaceForm;