import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ListTable from '../../../components/table/admin/ListTable';
import { ADDRESS } from '../../../Adress';
import CommonTableRow from '../../../components/table/CommonTableRow';
import CommonTableColumn from '../../../components/table/CommonTableColumn';
import Pagination from "react-js-pagination";
import { useHistory } from 'react-router-dom';

const placeList=[ 
  {hotspotId: 0, hotspotName: '강남 MICE 관광특구'},
  {hotspotId: 1, hotspotName: '동대문 관광특구'},
  {hotspotId: 2, hotspotName: '명동 관광특구'},
  {hotspotId: 3, hotspotName: '이태원 관광특구'},
  {hotspotId: 4, hotspotName: '잠실 관광특구'},
  {hotspotId: 5, hotspotName: '종로·청계 관광특구'},
  {hotspotId: 6, hotspotName: '홍대 관광특구'},
  {hotspotId: 7, hotspotName: '경복궁·서촌마을'},
  {hotspotId: 8, hotspotName: '광화문·덕수궁'},
  {hotspotId: 9, hotspotName: '창덕궁·종묘'},
  {hotspotId: 10, hotspotName: '가산디지털단지역'},
  {hotspotId: 11, hotspotName: '강남역'},
  {hotspotId: 12, hotspotName: '건대입구역'},
  {hotspotId: 13, hotspotName: '고속터미널역'},
  {hotspotId: 14, hotspotName: '교대역'},
  {hotspotId: 15, hotspotName: '구로디지털단지역'},
  {hotspotId: 16, hotspotName: '서울역'},
  {hotspotId: 17, hotspotName: '선릉역'},
  {hotspotId: 18, hotspotName: '신도림역'},
  {hotspotId: 19, hotspotName: '신림역'},
  {hotspotId: 20, hotspotName: '신촌·이대역'},
  {hotspotId: 21, hotspotName: '역삼역'},
  {hotspotId: 22, hotspotName: '연신내역'},
  {hotspotId: 23, hotspotName: '용산역'},
  {hotspotId: 24, hotspotName: '왕십리역'},
  {hotspotId: 25, hotspotName: 'DMC(디지털미디어시티)'},
  {hotspotId: 26, hotspotName: '창동 신경제 중심지'},
  {hotspotId: 27, hotspotName: '노량진'},
  {hotspotId: 28, hotspotName: '낙산공원·이화마을'},
  {hotspotId: 29, hotspotName: '북촌한옥마을'},
  {hotspotId: 30, hotspotName: '가로수길'},
  {hotspotId: 31, hotspotName: '성수카페거리'},
  {hotspotId: 32, hotspotName: '수유리 먹자골목'},
  {hotspotId: 33, hotspotName: '쌍문동 맛집거리'},
  {hotspotId: 34, hotspotName: '압구정로데오거리'},
  {hotspotId: 35, hotspotName: '여의도'},
  {hotspotId: 36, hotspotName: '영등포 타임스퀘어'},
  {hotspotId: 37, hotspotName: '인사동·익선동'},
  {hotspotId: 38, hotspotName: '국립중앙박물관·용산가족공원'},
  {hotspotId: 39, hotspotName: '남산공원'},
  {hotspotId: 40, hotspotName: '뚝섬한강공원'},
  {hotspotId: 41, hotspotName: '망원한강공원'},
  {hotspotId: 42, hotspotName: '반포한강공원'},
  {hotspotId: 43, hotspotName: '북서울꿈의숲'},
  {hotspotId: 44, hotspotName: '서울대공원'},
  {hotspotId: 45, hotspotName: '서울숲공원'},
  {hotspotId: 46, hotspotName: '월드컵공원'},
  {hotspotId: 47, hotspotName: '이촌한강공원'},
  {hotspotId: 48, hotspotName: '잠실종합운동장'},
  {hotspotId: 49, hotspotName: '잠실한강공원'}
 
]
function PlaceList() {
    const history=useHistory();
    const [ dataList, setDataList ] = useState([]);
    const [hotspotList,setHotspotList]=useState([]);
    const [pageNumber, setPageNumber] = useState(1); 
    const token = localStorage.getItem('token');
    const [sortOption, setSortOption] = useState(""); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [totalItemsCount,setTotalItemsCount] = useState(1);
  
  
   //페이지 이동
    const handlePageChange = (page) => {
      setPageNumber(page);
      window.scrollTo(0,0);
    };

    useEffect(() => {
        axios.get(`${ADDRESS}/hotspots`)
          .then(response => {
            // 서버로부터 받은 데이터 처리
            console.log(response.data);
            setHotspotList(response.data.hotspotDTOArrayList);
           
          })
          .catch(error => {
            // 에러 처리
            console.error(error);
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            localStorage.clear();
            window.location.pathname = "/";
          });
      }, []);

      
    
    //셀렉트박스 지역 선택
    const handleSortOptionChange = (e) => {
        const newSortOption = e.target.value;
        setSortOption(newSortOption);
        if (newSortOption === '') {
          // 전체를 선택한 경우 서버에서 전체 데이터를 가져옴
          fetchDataList();
        }
        setPageNumber(1)
        axios.get(`${ADDRESS}/admin/places/${newSortOption}`)
          .then(response => {
            console.log(response.data);
            setDataList(response.data.content);
          })
          .catch(error => {
            console.log(error);
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            localStorage.clear();
            window.location.pathname = "/";
          });
      };
    
      //서버에 코스 목록 조회 요청하기
      const fetchDataList = () => {
        const id = localStorage.getItem('id');
        axios.get(`${ADDRESS}/admin/places?page=${pageNumber-1}`)
          .then(response => {
            console.log(response.data);
            setDataList(response.data.content);
            setTotalItemsCount(response.data.totalElements)
          })
          .catch(error => {
            console.log(error);
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            localStorage.clear();
            window.location.pathname = "/";
          });
      };

      useEffect(() => {
        fetchDataList();
      }, [pageNumber,token]);


   
      return (
        <div>
          <div className="background-container" style={{ height: '980px' }}>
            <div className="overlay-container">
              <div className='line'>장소 관리</div>
              <div>  
                  <div className='select_container' style={{ marginBottom: '10px' }}>
                    <select value={sortOption} onChange={handleSortOptionChange}>
                      <option value="">전체</option>
                      {hotspotList.map((option) => (
                        <option key={option.hotspotId} value={option.hotspotId}>
                          {option.hotspotName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <>
                  <ListTable headersName={['장소 ID', '장소명', '지역', '후기', '분위기']}>
                    {dataList ? dataList.map((item, index) => {
                      const placeName = placeList.find(placeItem => placeItem.hotspotId === item.hotpotId)?.hotspotName ?? '';
      
                      return (
                        <CommonTableRow key={index}>
                          <CommonTableColumn>{item.placeId}</CommonTableColumn>
                          <span onClick={() => history.push(`/ad/place/${item.placeId}`)}>
                            <CommonTableColumn>{item.placeName}</CommonTableColumn>
                          </span>
                          <CommonTableColumn>{placeName}</CommonTableColumn>
                          <CommonTableColumn>{item.reviewCount}</CommonTableColumn>
                          <CommonTableColumn>{item.placeMood}</CommonTableColumn>
                        </CommonTableRow>
                      )
                    }) : ''}
                  </ListTable>
                </>
              </div>
            </div>
          </div>
          {!sortOption && (
            <div className="pagination-container" style={{ marginTop: '30px' }}>
              <Pagination
                activePage={pageNumber}
                itemsCountPerPage={20}
                pageRangeDisplayed={5}
                totalItemsCount={totalItemsCount}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                innerClass="pagination"
                prevPageLinkClassName="page-link prev"
                nextPageLinkClassName="page-link next"
              />
            </div>
          )}
        </div>
      );
  }      
export default PlaceList