import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { ADDRESS } from "../../Adress";


import Graph from "../../components/graph/Graph";
import Table from "../../components/table/admin/Table";



function Home_ad() {
  const history = useHistory();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        
      
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if (!token) {
          // 토큰이 없으면 home
          history.push("/");
        }
      
        axios.get(`${ADDRESS}/admin/`)
          .then(response => {
            // 서버로부터 받은 데이터 처리
            console.log(response.data);
          })
          .catch(error => {
            // 에러 처리
            alert(error.response.data.error);
          });
          
      }, []);
      
    
    


    return (
        <div className="container" style={{width:'300px',height:'100px'}}>
            <div className="row">
            <h3>관리자용 페이지</h3>
            </div>
                    
        </div>
    );
}

export default Home_ad;