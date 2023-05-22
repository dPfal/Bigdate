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
  Filler
);




const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
      max:20
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
    
  const [log,setLog]=useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    if (!token) {
      history.push('/');
    }
  
    axios
      .get(`${ADDRESS}/admin/`)
      .then((response) => {
        setLog(response.data)
       
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  const courseCounts = log.map((item) => item.courseCount).reverse();
  const commentCounts = log.map((item) => item.commentCount).reverse();
  const labels = log.map((item)=>item.date).reverse();
    
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "글",
          data:  courseCounts,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "댓글",
          tension: 0.3,
          data:commentCounts,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
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
        <MycourseTable headersName={['일자','가입','탈퇴', '글','댓글']} >
          {log.map((item) => (
            <CommonTableRow>
              <CommonTableColumn>{item.date}</CommonTableColumn>
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