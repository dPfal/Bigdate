import React from 'react';

const Footer = () => {
  
  return (
    <footer style={{ backgroundColor: '#f7f7f7', padding: '50px', textAlign: 'center', position: 'relative', transform: 'translateY(-100 %)', bottom: 0, width: '100%', fontFamily: 'Noto Sans KR', color:'#5F5F5F'}}>
      <img src='https://www.gachon.ac.kr/sites/kor/images/sub/slogan_3.png' style={{ width: '30px', margin: '10px' }}></img>
      <span style={{ fontWeight: 'bold' }}>Gachon University </span><br/>
      <span style={{ fontWeight: 'bold' }}>Team Bigdate</span><br />
        <span>References : </span>
        <a href='http://data.seoul.go.kr/dataList/OA-21285/A/1/datasetView.do' target='blank'>서울시 실시간 도시 데이터</a><br/>
        
      <span>Copyright 2023. thenthen. All Rights Reserved.</span><br />
      <a href='https://github.com/dPfal' target='_blank'>Github</a><br />
    </footer>
  );
};

export default Footer;