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
  
  const getPostByNo = course_id => {
    const array = postList.filter(x => x.course_id == course_id);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }
  
  export {
    postList,
    getPostByNo
  };