import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostView.css';
import { CircleFill, GeoAltFill, GeoFill, HandThumbsUp,Heart, StarFill, PersonCircle, HeartFill, HandThumbsUpFill} from 'react-bootstrap-icons';
import { ADDRESS } from '../../Adress';
import moment from 'moment';
const { kakao } = window;



const PostView = ({ history, location, match }) => {
  const [ data, setData ] = useState({});
  const [comment,setComment] = useState('');
  const[places,setPlaces]=useState([]);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [scrapCount, setScrapCount] = useState(data.scrapCount);
  const [isScrapped, setIsScrapped] = useState(false);

  const { course_id } = match.params;

/**코스 상세 정보 조회 axio get  course id로*/
/**코스 댓글 조회 axio get */

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

  //댓글 등록 함수
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
    const id = localStorage.getItem('id');
    
    try {
      console.log(comment)
      const token = localStorage.getItem('token');
      const response = await axios.post(`${ADDRESS}/users/comments`, { commentText:comment,courseId:parseInt(course_id),id:parseInt(id) }, {
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
      
      if(response.data=='좋아요 목록에서 삭제되었습니다.'){
        setLikeCount(likeCount-1);
        setIsLiked(false);
        
       }else{
        setLikeCount(likeCount+1);
        setIsLiked(true);
       
      }
      
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
      
      }else{
        setScrapCount(scrapCount+1);
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
            <div className="overlay-container">
            <div className='line' style={{display:'flex', justifyContent:'space-between'}}>
            <div>{data.courseTitle}</div>  
            <div style={{fontSize:'12px',color:'dimgray'}}><div > {date}</div><div style={{float:'right'}}> {data.userId}</div> </div>
            </div>


        <div style={{ display: 'flex' }}>
               <div
                    id="myMap"
                    style={{ 
                      width: '400px',
                      height: '400px',
                      margin:'30px',
                      zIndex:0
                    }}>
                </div>





                {/**map함수로 코스에 해당하는 장소 넣기 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                {courses.map((course, index) => (
                  <div key={index} style={{marginTop:'30px'}}>
                    <div style={{display:'flex'}}>
                      <div className='placeNum' style={{backgroundColor:'#1e90ff',margin:'0px',color:'white',paddingLeft:'7px'}}>{index + 1}</div>
                      <div style={{marginLeft:'10px'}}>{course.placeDTO.placeName}</div>
                    </div>
                    <div style={{display:'flex',marginTop:'7px'}}>
                      <div style={{marginLeft:'5px',fontSize:'11px'}}><CircleFill style={{fontSize:'5px',color:'#1e90ff',marginRight:'20px'}}/>{course.placeDTO.categoryName}</div>
                      <div style={{marginLeft:'10px',fontSize:'11px'}}><StarFill style={{color:'orange',marginBottom:'5px'}}/>
                       {course.avgScore}</div>
                    </div>
                    <div style={{marginLeft:'5px',marginTop:'7px',fontSize:'11px'}}><CircleFill style={{fontSize:'5px',color:'#1e90ff',marginRight:'20px'}}/><GeoAltFill style={{color:'gray',fontSize:'10px'}}/>
                    {course.placeDTO.addressName}</div>                 
                  </div>

                  
                ))}

                    <div style={{marginTop:'50px',display:'flex',justifyContent:'center',borderTop:'1px solid lightgray',width:'300px'}}>
                  1인 예상 금액 :{totalExpense}  원</div>
                
              </div>

              

         </div>
              

         <div className='line'>코스 설명
        </div>
        <div style={{marginLeft:'40px',fontSize:'12px'}}>{data.courseInfo}</div>



        <div className='line'>코스 상세보기
        </div>
       {/**map함수로 코스에 해당하는 장소 넣기 */}
       <div style={{ display: 'flex', flexDirection: 'column' }}>
                {courses.map((course, index) => (
                  <div key={index} style={{marginTop:'30px',marginLeft:'40px'}}>
                    <div style={{display:'flex',marginBottom:'10px'}}>
                      <div className='placeNum' style={{backgroundColor:'#1e90ff',margin:'0px',color:'white',paddingLeft:'7px'}}>{index + 1}</div>
                      <div style={{marginLeft:'10px'}}>{course.placeDTO.placeName}</div>
                    </div>
                    <div style={{display:'flex'}}>
                      <img src={course.placeDTO.imageUrl} style={{width:'150px',height:'150px', borderRadius:'10px'}}></img>
                      <div style={{display:'block',marginLeft:'20px'}}>
                      <div><GeoAltFill style={{color:'#3163C9',fontSize:'20px'}}/> {course.placeDTO.addressName} <StarFill style={{color:'orange',marginBottom:'5px'}}/>
                       {course.avgScore}</div>
                    
                      <div style={{border:'1px solid lightgray', borderRadius:'10px',width:'500px',height:'100px',marginTop:'10px',padding:'10px'}}>{course.reviewInfo}</div>
                      </div>
                    </div>
                    
                    
                  </div>
                ))}
                
              </div>

        
        <div style={{display:'flex',justifyContent:'center',marginTop:'50px'}}>
          <div style={{border: '1px solid lightgray',padding:'10px',alignContent:'center',textAlign:'center'}} onClick={handleLikeClick}>
              {isLiked?
              (<HandThumbsUpFill style={{ fontSize: '20px',color:'#1E90FF'}} />):
              (<HandThumbsUp style={{ fontSize: '20px',color:'#1E90FF'}} />)
              }

              <div>{likeCount}</div>
          </div>
          <div style={{ border: '1px solid lightgray', padding: '10px', marginLeft: '20px', textAlign: 'center' }} onClick={handleScrapClick}>
              
              {isScrapped?
              (<HeartFill style={{ fontSize: '20px', color: 'red' }} /> ):
              (<Heart style={{ fontSize: '20px', color: 'red' }} /> )
              }
              <div>{scrapCount}</div>
          </div>
        </div>


        <div className='line'>댓글</div>
       <div>
      {/**댓글 리스트 */}          
       <div>
       {commentArray && commentArray.length > 0 ? (
          commentArray.map((comment) => {
          const { id} = comment;
          return (
            <div key={id}>
              <div style={{display:'flex'}}>
                <div style={{marginLeft:'130px',color: comment.user.userRole === 'ADMIN' ? 'darkBlue' : 'black'}}>{comment.user.userRole === 'ADMIN' ? '관리자' : comment.user.userId}</div>
                <div style={{marginLeft:'20px'}}>  {comment.commentDate = moment(comment.commentDate).format('YYYY-MM-DD HH:mm')}</div>
              </div>           

              <div className='toCenter'>
                <div style={{width: '50px', height: '50px' }} className='toCenter'>
                  <PersonCircle style={{ fontSize: '40px',color:'dimgray' }} />
                </div>
                <div style={{ marginLeft: '10px', width: '600px',borderBottom:'1px solid lightgray',marginTop:'20px',paddingBottom:'25px' }}>
                  {comment.commentText}
                </div>
              </div>
            </div>
          )
          })
          ) : (
            <div style={{textAlign:'center',color:'gray',marginTop:'30px',marginBottom:'30px'}}>댓글이 없습니다.</div>
          )}
        </div>

      </div>



        <form onSubmit={handleSubmit}>
          <div>
          <div style={{marginLeft:'130px',marginTop:'20px'}}>{localStorage.getItem('userId')}</div>
          </div>

          
            <div className='toCenter'>
              <div style={{width: '50px', height: '50px' }} className='toCenter'>
                <PersonCircle style={{ fontSize: '40px',color:'dimgray' }} />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)} // state를 업데이트합니다.
                placeholder='댓글을 입력하세요'
                style={{ marginLeft: '10px', width: '600px' }}
              />
            </div>
            <div>
              <button type="submit" className='postComment'>
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