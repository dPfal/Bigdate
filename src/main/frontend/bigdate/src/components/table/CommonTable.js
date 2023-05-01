import React, { useState } from 'react';
import './CommonTable.css';
import { Pencil} from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';




const CommonTable = props => {

  const { headersName, children} = props;
  const [sortOption, setSortOption] = useState(""); // 라디오 버튼의 선택된 옵션 상태 관리

  const history = useHistory();

  const handleButtonClick = () => {
    //로그인 안 한 사용자일 경우 글쓰기 x
    if (!localStorage.getItem('token')) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    // 버튼 클릭 시 페이지 이동
    history.push('/user/course/write');
  };

  // 라디오 버튼의 옵션 변경 핸들러
  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
    // 선택된 옵션에 따라 데이터 정렬 또는 필요한 로직 수행
    // 예시: 최신 순, 좋아요 순, 찜 순에 따라 dataList를 정렬하거나 서버에 요청 등
    // 정렬된 데이터를 다시 렌더링하거나 필요한 로직 수행
  };

  return (
    <div>
    <table className="common-table">
      <thead>
      
        {<td colSpan={headersName.length} style={{ textAlign: "right"}}>
            {/* 라디오 버튼들 */}
            <div className='head_container'>
            <div style={{marginRight:'30px'}}>
                <button onClick={handleButtonClick} style={{margiLeft:'100px',marginTop:'10px'}}>
                <Pencil fontSize={10} /> 글쓰기
        
                </button>
              </div> 
              <div className='radio_container'>
              <input
                  
                  type="radio"
                  id="radio1"
                  name="sortOption"
                  value="recent"
                  checked={sortOption === "recent"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="radio1">최신 순</label>
                <input
                  type="radio"
                  id="radio2"
                  name="sortOption"
                  value="like"
                  checked={sortOption === "like"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="radio2">좋아요 순</label>
                <input
                  type="radio"
                  id="radio3"
                  name="sortOption"
                  value="scrap"
                  checked={sortOption === "scrap"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="radio3">찜 순</label>
              </div>
              
            </div>
          </td>}
        <tr>
          {
            headersName.map((item, index) => {
              return (
                <td className="common-table-header-column" key={index}>{ item }</td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>   
    </table>


    </div>
  )
}

export default CommonTable;