import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';

function Procedures(){
  const adres = "https://test-1-k2ol.onrender.com";
  
  const [result, setResult] = useState(["Sunucu Bekleniyor..."]);
  const [update, setUpdate] = useState([]);

  function Test(){
    setResult("Bekleyiniz...");

    axios(adres + "/test")
    .then((res)=> setResult("Test : " + res.data))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı\r\n" + e));
  }

  function Test2(){
    setUpdate();
  }

  return (
    <>
      <button onClick={Test}>Test</button>
      <br></br>
      {result}

      <script type="text/javascript" src="https://istanbuluseyret.ibb.gov.tr/wp-content/plugins/bradmax-player/assets/js/default_player.js" id="bradmax-player-js"></script>
      <script type="text/javascript" src="/src/player.jsx"></script>
      <div id="bradmaxPlayer" class='playerArea'></div>
      <button onClick={bradmaxPlayerInit()}>Test2</button>
      
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);