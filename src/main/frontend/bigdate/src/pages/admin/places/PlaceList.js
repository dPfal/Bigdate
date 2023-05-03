import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ListTable from '../../../components/table/admin/ListTable';
import { ADDRESS } from '../../../Adress';
import CommonTableRow from '../../../components/table/CommonTableRow';
import CommonTableColumn from '../../../components/table/CommonTableColumn';
import Pagination from 'react-bootstrap/Pagination';

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
    const [ dataList, setDataList ] = useState([]);
    const [hotspotList,setHotspotList]=useState([]);
    const [pageNumber, setPageNumber] = useState(0); 
    const token = localStorage.getItem('token');
    const [sortOption, setSortOption] = useState(""); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  
  
    let items = [];
    const totalPages = 10; // 예시로 총 10 페이지가 있다고 가정합니다.
    const startPage = Math.max(1, pageNumber - 2);
    const endPage = Math.min(totalPages, pageNumber + 2);
    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageNumber + 1}
          onClick={() => setPageNumber(number - 1)}
        >
          {number}
        </Pagination.Item>
      );
    }
      
      const paginationBasic = (
        <div>
          <Pagination size="sm">{items}</Pagination>
        </div>
    );
    useEffect(() => {
        axios.get(`${ADDRESS}/hotspots`)
          .then(response => {
            // 서버로부터 받은 데이터 처리
            console.log(response.data);
            setHotspotList(response.data);
      
            // 상태 업데이트
            
           
          })
          .catch(error => {
            // 에러 처리
            console.error(error);
          });
      }, []);

      
    
    //셀렉트박스 지역 선택
    const handleSortOptionChange = (e) => {
        const newSortOption = e.target.value;
        setSortOption(newSortOption);
        
        axios.get(`${ADDRESS}/courses?page=${pageNumber}&sort=${newSortOption}`)
          .then(response => {
            console.log(response.data);
            setDataList(response.data.content);
          })
          .catch(error => {
            console.log(error);
          });
      };
    
      //서버에 코스 목록 조회 요청하기
      const fetchDataList = () => {
        const id = localStorage.getItem('id');
        axios.get(`${ADDRESS}/admin/places?page=${pageNumber}`)
          .then(response => {
            console.log(response.data);
            setDataList(response.data.content);
          })
          .catch(error => {
            console.log(error);
          });
      };

      useEffect(() => {
        fetchDataList();
      }, [pageNumber]);


     const handleDelete = async (courseId) => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
      try {
        const response = await axios.delete(`${ADDRESS}/users/courses/${courseId}`);
        console.log(response);
        
        // 목록을 다시 불러오기 위해 1초 대기 후에 실행
        setTimeout(() => {
          fetchDataList();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };
  
      return (
        <div>
       <div className="background-container">
      
      <div className="overlay-container">
  
     

        <div  className='line'>장소 관리
        </div>

        <div >
        <>
            <div className='select_container'>
            <select value={sortOption} onChange={ handleSortOptionChange}>
            {hotspotList.map((option) => (
                <option key={option.hotspotId} value={option.hotspotId}>
                {option.hotspotName}
                </option>
            ))}
            </select>
            </div>
            
            <ListTable headersName={['장소 ID','장소명','지역', '후기', '분위기']}>
                
              { dataList ? dataList.map((item, index) => {
                 const placeName = placeList.find(placeItem => placeItem.hotspotId === item.hotpotId)?.hotspotName ?? '';

                  return (
                  
                    <CommonTableRow key={index}>
                      <CommonTableColumn>{ item.placeId }</CommonTableColumn>
                      <CommonTableColumn>{item.placeName} </CommonTableColumn>
                      <CommonTableColumn>{placeName}</CommonTableColumn>
                      <CommonTableColumn>{item.reviewCount}</CommonTableColumn>
                      <CommonTableColumn>{item.placeMood}</CommonTableColumn>
                    </CommonTableRow>
                  )
                }) : ''
              }
            </ListTable>
          </>
        </div>
        

      </div>    {paginationBasic}
        </div>
        </div>

     
      
)
}
export default PlaceList
