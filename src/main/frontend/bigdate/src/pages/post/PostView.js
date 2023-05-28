import React, { useEffect, useState,useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './PostView.css';
import { CircleFill, GeoAltFill, GeoFill, HandThumbsUp, Heart, StarFill, PersonCircle, HeartFill, HandThumbsUpFill } from 'react-bootstrap-icons';
import { ADDRESS } from '../../Adress';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
const { kakao } = window;

const PostView = ({ history, location, match }) => {
  const [data, setData] = useState({});
  const [comment, setComment] = useState('');
  const [places, setPlaces] = useState([]);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [scrapCount, setScrapCount] = useState(data.scrapCount);
  const [isScrapped, setIsScrapped] = useState(false);

  const { course_id } = match.params;
  const userId = localStorage.getItem('userId');


// 스크롤을 맨 위로 올리는 함수
const scrollToTop = () => {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  } else {
    window.scrollTo(0, 0);
  }
};



useEffect(() => {
  const id = localStorage.getItem('id');
  const url = id ? `${ADDRESS}/courses/${course_id}?id=${id}` : `${ADDRESS}/courses/${course_id}`;
  axios.get(url)
    .then(response => {
      setData(response.data);
      console.log(response.data);
      setLikeCount(response.data.likeCount);
      setIsLiked(response.data.liked);
      setScrapCount(response.data.scrapCount);
      setIsScrapped(response.data.scraped);
      setPlaces(response.data.reviewList);
      scrollToTop(); // 스크롤을 맨 위로 올림

      const container = document.getElementById('myMap');

      // 모든 장소들의 좌표를 담는 bounds 객체를 생성합니다
      const bounds = new kakao.maps.LatLngBounds();

      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(37.5502, 126.982), // 기본 중심 좌표
        level: 3,
      });

      // 각각의 장소에 대해 마커를 생성하여 지도에 표시합니다
      response.data.reviewList.forEach(review => {
        const latLng = new kakao.maps.LatLng(review.placeDTO.placeY, review.placeDTO.placeX);
        let marker = new kakao.maps.Marker({
          map: map,
          position: latLng,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + review.placeDTO.placeName + '</div>');
          infowindow.open(map, marker);
        });

        // bounds 객체에 현재 마커의 좌표를 추가합니다
        bounds.extend(latLng);
      });

      // 모든 장소들의 좌표를 포함하는 지도 영역을 설정합니다
      map.setBounds(bounds);
    })
    .catch(error => {
      console.log(error);
    });
}, [course_id]);


const courses = data?.reviewList ?? [];

const commentArray = data?.commentList ?? [];

const totalExpense = courses.reduce((acc, review) => {
  const expense = review?.expense ?? 0;
  return acc + expense;
}, 0);

const date = moment(data.postedDate).format('YYYY-MM-DD HH:mm');



  const handleSubmit = (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 방지합니다.
    postComment(comment); // state의 값을 인자로 전달합니다.
    setComment(''); // 댓글 등록 후 state를 초기화합니다.
  };


  const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u200D|\uFE0F/g;

  const postComment = async (comment) => {
    setComment(comment);
    if (!comment) {
      alert('글 내용을 입력해주세요.');
      return;
    }
  
    if (!localStorage.getItem('token')) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }
    
    if (comment.length < 10) {
      alert('댓글 내용은 최소 10글자여야합니다.');
      return;
    }
    
    if (comment.length > 2000) {
      alert('댓글은 최대 2000자까지 입력 가능합니다.');
      return;
    }
  
    const filteredComment = comment.replace(emojiRegex, '□'); // 이모지 필터링
    
    const id = localStorage.getItem('id');
  
    try {
      console.log(filteredComment)
      const token = localStorage.getItem('token');
      const response = await axios.post(`${ADDRESS}/users/comments`, { commentText:filteredComment, courseId:parseInt(course_id), id:parseInt(id) }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('댓글이 등록되었습니다.')
      window.location.reload(false);
   
      return response.data;
    } catch (error) {
      console.error(error);
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      localStorage.clear();
      window.location.pathname = "/";
    }
  };
  
  
  

  const handleLikeClick = async () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if(token==null){
      alert('로그인이 필요한 서비스입니다.')
    }
    
    try {
      const response = await axios.post(`${ADDRESS}/users/likes?courseId=${course_id}`
      );
      console.log(response);

      if (response.data == '좋아요 목록에서 삭제되었습니다.') {
        setLikeCount(likeCount - 1);
        setIsLiked(false);

      } else {
        setLikeCount(likeCount + 1);
        setIsLiked(true);

      }


    } catch (error) {
      console.error(error);
    }
  };

  function handleCommentDeleteConfirm(userId,commentDate,courseId) {
    const result = window.confirm(`댓글을 삭제하시겠습니까?`);
    if (result === true) {
     handleDelete(userId,courseId,commentDate);

    }
    else{ return;}
  }

  const handleDelete = async (userId, courseId, commentDate) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(commentDate)

    const requestData = {
      id: userId,
      courseId: courseId,
      commentDate:commentDate
    };

    try {
      // 댓글 삭제 요청
      axios.delete(`${ADDRESS}/users/comments`, { data: requestData })
        .then(response => {
          console.log(response.data);
          alert('댓글이 삭제되었습니다.')
          window.location.reload(false);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleScrapClick = async () => {
    
    const token = localStorage.getItem('token');
    if(token==null){
      alert('로그인이 필요한 서비스입니다.')
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   
    try {
      const response = await axios.post(`${ADDRESS}/users/scraps?courseId=${course_id}`,
      );
      console.log(response);
      
      if(response.data=='찜 목록에서 삭제되었습니다.'){
        setScrapCount(scrapCount-1);
        setIsScrapped(false);

      } else {
        setScrapCount(scrapCount + 1);
        setIsScrapped(true);

      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>


      <div className="post-view-wrapper">

        {
          data ? (
            <>
              <div className='background-container'>
                <div className="overlay-container" style={{
                  paddingLeft: '150px',
                  paddingRight: '150px'
                }}>
                  <div className='line' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>{data.courseTitle}</div>
                    <div style={{ fontSize: '12px', color: 'dimgray' }}><div > {date}</div><div style={{ float: 'right' }}> {data.userId}</div> </div>
                  </div>


                  <div style={{ display: 'flex' }}>
                    <div
                      id="myMap"
                      style={{
                        width: '400px',
                        height: '400px',
                        margin: '30px',
                        zIndex: 0
                      }}>
                    </div>





                    {/**map함수로 코스에 해당하는 장소 넣기 */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                      {courses.map((course, index) => (
                        <div key={index} style={{ marginTop: '30px' }}>
                          <div style={{ display: 'flex' }}>
                            <div className='placeNum' style={{ backgroundColor: '#1e90ff', margin: '0px', color: 'white', paddingLeft: '7px' }}>{index + 1}</div>
                            <div style={{ marginLeft: '10px' }}>{course.placeDTO.placeName}</div>
                          </div>
                          <div style={{ display: 'flex', marginTop: '7px' }}>
                            <div style={{ marginLeft: '5px', fontSize: '11px' }}><CircleFill style={{ fontSize: '5px', color: '#1e90ff', marginRight: '20px' }} />{course.placeDTO.categoryName}</div>
                            <div style={{ marginLeft: '10px', fontSize: '11px' }}><StarFill style={{ color: 'orange', marginBottom: '5px' }} />
                              {course.avgScore}</div>
                          </div>
                          <div style={{ marginLeft: '5px', marginTop: '7px', fontSize: '11px' }}><CircleFill style={{ fontSize: '5px', color: '#1e90ff', marginRight: '20px' }} /><GeoAltFill style={{ color: 'gray', fontSize: '10px' }} />
                            {course.placeDTO.addressName}</div>
                        </div>


                      ))}

                      <div style={{ fontSize:'17px',marginTop: '50px', display: 'flex', justifyContent:'center', borderTop: '1px solid lightgray', width: '400px' ,paddingTop:'30px'}}>
                        총 지출 금액 : {totalExpense}  원</div>

                    </div>



                  </div>


                  <div className='line'>코스 설명
                  </div>
                  <div style={{ marginLeft: '40px', marginTop: '20px', fontSize: '15px', fontWeight: 'initial' }}>{data.courseInfo}</div>



                  <div className='line' style={{ marginTop: '50px' }}>코스 상세보기
                  </div>
                  {/**map함수로 코스에 해당하는 장소 넣기 */}

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {courses.map((course, index) => (
                      <div key={index} style={{ marginTop: '30px', marginLeft: '40px' }}>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>

                          <div className='placeNum' style={{ backgroundColor: '#1e90ff', margin: '0px', color: 'white', paddingLeft: '7px' }}>{index + 1}</div>
                          <Link to={`/place/${course.placeId}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ marginLeft: '10px' }}>{course.placeDTO.placeName}</div>
                          </Link>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Link to={`/place/${course.placeId}`} style={{ textDecoration: 'none' }}>
                            <img src={course.placeDTO.imageUrl} style={{ width: '150px', height: '150px', borderRadius: '10px' }}></img>
                          </Link>
                          <div style={{ display: 'block', marginLeft: '20px' }}>
                            <div><GeoAltFill style={{ color: '#3163C9', fontSize: '20px' }} /> {course.placeDTO.addressName} <StarFill style={{ color: 'orange', marginBottom: '5px' }} />
                              {course.avgScore}</div>

                            <Link to={`/place/${course.placeId}`} style={{ textDecoration: 'none', color: 'black' }}>
                              <div style={{ border: '1px solid lightgray', borderRadius: '10px', width: '600px', height: '100px', maxHeight: '200px', overflow: 'hidden', overflowY: 'auto', marginTop: '10px', padding: '10px', fontWeight: '500' }}>
                                {course.isDel === 1 ? <span className='toCenter' style={{ paddingTop: '25px' }}>관리자에 의해 숨김 처리된 후기 입니다.</span> : course.reviewInfo}
                              </div>
                            </Link>
                            <div style={{ float: 'right' , marginTop:'10px'}}>지출 금액 : {course.expense}원</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>




                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <div style={{ border: '1px solid lightgray', padding: '10px', alignContent: 'center', textAlign: 'center' }} onClick={handleLikeClick}>
                      {isLiked ?
                        (<HandThumbsUpFill style={{ fontSize: '20px', color: '#1E90FF' }} />) :
                        (<HandThumbsUp style={{ fontSize: '20px', color: '#1E90FF' }} />)
                      }

                      <div>{likeCount}</div>
                    </div>
                    <div style={{ border: '1px solid lightgray', padding: '10px', marginLeft: '20px', textAlign: 'center' }} onClick={handleScrapClick}>

                      {isScrapped ?
                        (<HeartFill style={{ fontSize: '20px', color: 'red' }} />) :
                        (<Heart style={{ fontSize: '20px', color: 'red' }} />)
                      }
                      <div>{scrapCount}</div>
                    </div>
                  </div>


        <div className='line'>댓글</div>
       <div>
       <div>
      {commentArray && commentArray.length > 0 ? (
        commentArray.map((comment) => {
          const { id } = comment;
          const isMyComment = comment.user.userId=== userId; // 내가 작성한 댓글인지 확인합니다.
          return (
            <div key={id}>
              <div style={{display: 'flex',width: '850px',marginTop: '20px',justifyContent:' space-between' }}>
                <div style={{ marginLeft:'45px',paddingTop: '10px', color: comment.user.userRole === 'ADMIN' ? 'darkBlue' : 'black' }}>{comment.user.userRole === 'ADMIN' ? '관리자' : comment.user.userId}</div>
                <div >
                  {isMyComment && (
                    <span style={{ margin: '10px' }}>
                      <button className='delBtn' onClick={() => handleCommentDeleteConfirm(comment.id, comment.commentDate, comment.courseId)}>
                        삭제
                      </button>
                    </span>
                  )}
                  {comment.commentDate}
                  
                </div>
                
              </div>
              

              <div style = {{display:'flex', marginLeft:'40px'}}>
                <div style={{ width: '50px', height: '50px' }} className='toCenter'>
                  <PersonCircle style={{ fontSize: '40px', color: 'dimgray' }} />
                </div>
                <div style={{ marginLeft: '20px', width: '750px', borderBottom: '1px solid lightgray',display:'flex',alignItems:'center' }}>
                  {comment.commentText}
                </div>
               
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', color: 'gray', marginTop: '30px', marginBottom: '30px' }}>댓글이 없습니다.</div>
      )}
    </div>
    </div>



                  <form onSubmit={handleSubmit}>
                    <div style={{ marginLeft: '40px' }}>
                      <div style={{ marginTop: '20px' }}>{localStorage.getItem('userId')}</div>
                    </div>


                    <div style={{marginLeft:'40px',display:'flex'}}>
                      <div style={{ width: '50px', height: '50px', alignItems: 'flexEnd', display: 'flex' }} className='toCenter'>
                        <PersonCircle style={{ fontSize: '40px', color: 'dimgray' }} />
                      </div>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} // state를 업데이트합니다.
                        placeholder='댓글을 입력하세요'
                        style={{ marginLeft: '10px', width: '750px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>
                    <button type="submit" className='postComment' style={{ marginLeft: '700px' }}>
                      등록
                    </button>
</div>
                  </form>

                </div>
              </div>
            </>

          ) : '해당 게시글을 찾을 수 없습니다.'
        }

      </div>
    </>
  )
}

export default PostView;