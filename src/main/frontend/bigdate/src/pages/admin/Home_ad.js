import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import CommonTableColumn from "../../components/table/CommonTableColumn";
import MycourseTable from "../../components/table/MyCourseTable";
import CommonTableRow from "../../components/table/CommonTableRow";
import { ADDRESS } from "../../Adress";
import { useHistory } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, 
  Colors
);




const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart() {
  const history = useHistory();
  const token = localStorage.getItem('token'); 
  const [log,setLog]=useState([]);
  
  useEffect(() => {
    if(!token){
      alert('올바른 접근이 아닙니다.')
      window.location.pathname = "/";
    }
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 
    axios
      .get(`${ADDRESS}/admin/`)
      .then((response) => {
        setLog(response.data)
       
      })
      .catch((error) => {
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        localStorage.clear();
        window.location.pathname = "/";
      });
  }, [token]);

  const courseCounts = log.map((item) => item.courseCount).reverse();
  const commentCounts = log.map((item) => item.commentCount).reverse();
  const hitCount = log.map((item) => item.hitCount).reverse();
  const labels = log.map((item)=>item.date).reverse();
    
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "방문자 수",
          type: 'line',
          data: hitCount,
          fill: false,
          pointRadius: 6,
        },
        {
          label: "글",
          data:  courseCounts,
          tension: 0.3,
          pointRadius: 6,
        },
        {
          label: "댓글",
          tension: 0.3,
          data:commentCounts,
          pointRadius: 6,
        }
      ],
      labels,
    };
  }, [log]);

  return (
  <div className='background-container' >
    <div className="overlay-container">
    <div className='line'>일자별 통계</div> 
        <Line data={data} options={options} style={{ margin: '30px' }} />
    </div>

    <div  style={{paddingBottom:'20px'}}>
        <>
          <MycourseTable headersName={['일자', '방문','가입','탈퇴', '글','댓글']} >
          {log.map((item) => (
            <CommonTableRow>
              <CommonTableColumn>{item.date}</CommonTableColumn>
              <CommonTableColumn>{item.hitCount}</CommonTableColumn>
              <CommonTableColumn>{item.joinCount}</CommonTableColumn>
              <CommonTableColumn>{item.withDrawCount}</CommonTableColumn>
              <CommonTableColumn>{item.courseCount}</CommonTableColumn>
              <CommonTableColumn>{item.commentCount}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </MycourseTable>
          </>
        </div>
  </div>
  )
}