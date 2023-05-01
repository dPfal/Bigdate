import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // slick 라이브러리의 기본 CSS 파일
import 'slick-carousel/slick/slick-theme.css'; // slick 라이브러리의 테마 CSS 파일
import './EbayCarousel.css'
import axios from 'axios';


const EbayCarousel = ({ places }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      
      infinite: false,
      

      // 추가적인 설정 및 스타일링
    };

    const [images, setImages] = useState([]);
/*
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const imageRequests = places.map((place) => {
            const query = encodeURIComponent(place.placeName);
            const apikey='871ca3e2c0b32eaef826dedc28315ef8'
            const apiUrl = `https://dapi.kakao.com/v2/search/image?query='${query}`;
            const headers = { 'Authorization': `KakaoAK ${apikey}` };
            return axios.get(apiUrl, { headers });
          });
    
          const responses = await Promise.all(imageRequests);
    
          const imagesData = responses.map((response, index) => {
            const place = places[index];
            if (response.status === 200) {
              return {
                placeName: place.placeName,
                imageUrl: response.data.documents[0]?.image_url ?? '',
              };
            } else {
              console.error(`Error ${response.status}: ${response.statusText}`);
              return {
                placeName: place.placeName,
                imageUrl: '',
              };
            }
          });
    
          setImages(imagesData);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchImages();
    }, [places]);
*/
// 이미지 클릭 이벤트 핸들러
const handleImageClick = (placeId) => {
  // 장소 상세정보 페이지로 이동
  window.location.href = `/place/${placeId}`; // 장소 ID를 URL에 포함하여 전달
};

    return (
      <div>
      <Slider {...settings}>
        {/* 장소 목록을 map() 메소드를 사용하여 동적으로 슬라이드로 생성 */}
        {places.map(place => (
          <div className="carousel-slide" key={place.placeId}>
            <img className="carousel-image" src={place.imageUrl} style={{width:'200px',height:'200px',borderRadius:'10px',marginTop:'20px',marginLeft:'60px'}} 
            onClick={() => handleImageClick(place.placeId)}/>
            <div>{place.placeName}</div>
            {/* 추가적인 장소 정보 혹은 컴포넌트 */}
          </div>
        ))}
      </Slider>
      </div>
    );
  };
  
  export default EbayCarousel;
