import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
//import { postList } from '../../Data';
import { HandThumbsUp,Heart, } from 'react-bootstrap-icons';


const getPostByNo = course_id => {
  const array = postList.filter(x => x.course_id == course_id);
  if (array.length == 1) {
    return array[0];
  }
  return null;
}
const postList = [
  {
    "course_id": 1,
    "course_name": "강남역 가성비 데이트 코스 추천!!",
    "user_id": "0000001",
    "LikeCount": 6,
    "ScrapCount": 6,
    "posted_date": "2020-10-25",
    "course_info":"강남역 가면 꼭 방문해보세요"

  },
  {
      "course_id": 2,
      "course_name": "강남역 가성비 데이트 코스 추천!!",
      "user_id": "0000001",
      "LikeCount": 6,
      "ScrapCount": 6,
      "posted_date": "2020-10-25",
      "course_info":"강남역 가면 꼭 방문해보세요"

    },
    {
      "course_id": 3,
      "course_name": "강남역 가성비 데이트 코스 추천!!",
      "user_id": "0000001",
      "LikeCount": 6,
      "ScrapCount": 6,
      "posted_date": "2020-10-25",
      "course_info":"강남역 가면 꼭 방문해보세요"

    },
    {
      "course_id": 4,
      "course_name": "강남역 가성비 데이트 코스 추천!!",
      "user_id": "0000001",
      "LikeCount": 6,
      "ScrapCount": 6,
      "posted_date": "2020-10-25",
      "course_info":"강남역 가면 꼭 방문해보세요"

    },
    {
        "course_id": 5,
        "course_name": "강남역 가성비 데이트 코스 추천!!",
        "user_id": "0000001",
        "LikeCount": 6,
        "ScrapCount": 6,
        "posted_date": "2020-10-25",
        "course_info":"강남역 가면 꼭 방문해보세요"
  
      },
      {
        "course_id": 6,
        "course_name": "강남역 가성비 데이트 코스 추천!!",
        "user_id": "0000001",
        "LikeCount": 6,
        "ScrapCount": 6,
        "posted_date": "2020-10-25",
        "course_info":"강남역 가면 꼭 방문해보세요"
  
      },
      {
          "course_id": 7,
          "course_name": "강남역 가성비 데이트 코스 추천!!",
          "user_id": "0000001",
          "LikeCount": 6,
          "ScrapCount": 6,
          "posted_date": "2020-10-25",
          "course_info":"강남역 가면 꼭 방문해보세요"
    
        },
        {
            "course_id": 8,
            "course_name": "강남역 가성비 데이트 코스 추천!!",
            "user_id": "0000001",
            "LikeCount": 6,
            "ScrapCount": 6,
            "posted_date": "2020-10-25",
            "course_info":"강남역 가면 꼭 방문해보세요"
      
          },
       {
            "course_id": 9,
            "course_name": "강남역 가성비 데이트 코스 추천!!",
            "user_id": "0000001",
            "LikeCount": 6,
            "ScrapCount": 6,
            "posted_date": "2020-10-25",
            "course_info":"강남역 가면 꼭 방문해보세요"
      
          },
      {
              "course_id": 10,
              "course_name": "강남역 가성비 데이트 코스 추천!!",
              "user_id": "0000001",
              "LikeCount": 6,
              "ScrapCount": 6,
              "posted_date": "2020-10-25",
              "course_info":"강남역 가면 꼭 방문해보세요"
        
            },
          {
                "course_id": 11,
                "course_name": "강남역 가성비 데이트 코스 추천!!",
                "user_id": "0000001",
                "LikeCount": 6,
                "ScrapCount": 6,
                "posted_date": "2020-10-25",
                "course_info":"강남역 가면 꼭 방문해보세요"
          
              },
          {
                "course_id": 12,
                "course_name": "강남역 가성비 데이트 코스 추천!!",
                "user_id": "0000001",
                "LikeCount": 6,
                "ScrapCount": 6,
                "posted_date": "2020-10-25",
                "course_info":"강남역 가면 꼭 방문해보세요"
          
              },
];
const PostList = props => {
  const [dataList, setDataList] = useState([]);


  const getPostByNo = course_id => {
    const array = postList.filter(x => x.course_id == course_id);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }

 

  //서버에 코스 목록 조회 요청하기
  useEffect(() => {
    setDataList(postList);    //dataList배열 서버에서 받아온 코스 목록 셋팅
  }, []);

  return (
    <div>
      <div className='background-container' >
        <div className='overlay-container'>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: 'large',
              marginRight: '40px',
              marginLeft: '40px',
              borderBottom: '1px solid gray',
            }}
          >
            그때 코스
          </div>

          <div>
            <>
              <CommonTable
                headersName={[
                  '글번호',
                  '제목',
                  '작성자',
                  '좋아요 수',
                  '찜 수',
                  '작성일',
                ]}
              >
                {dataList
                  ? dataList.map((item, index) => {
                      return (
                        <CommonTableRow key={index}>
                          <CommonTableColumn>{item.course_id}</CommonTableColumn>
                          <CommonTableColumn>
                            <Link to={`/postView/${item.course_id}`}>
                              {item.course_name}
                            </Link>
                          </CommonTableColumn>
                          <CommonTableColumn>{item.user_id}</CommonTableColumn>
                          <CommonTableColumn>
                            <HandThumbsUp
                              style={{ marginRight: '5px' }}
                            />
                            {item.LikeCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            <Heart style={{ marginRight: '5px' }} />
                            {item.ScrapCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            {item.posted_date}
                          </CommonTableColumn>
                        </CommonTableRow>
                      );
                    })
                  : ''}
              </CommonTable>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
export {postList,getPostByNo}