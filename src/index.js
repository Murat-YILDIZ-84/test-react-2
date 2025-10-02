import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';

function Procedures(){
  const adres = "https://test-1-k2ol.onrender.com";
  
  const [result, setResult] = useState(["Sunucu Bekleniyor..."]);

  function Test(){
    setResult("Bekleyiniz...");

    axios(adres + "/test")
    .then((res)=> setResult("Test : " + res.data))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı\r\n" + e));
  }

  function Test2(){
    return (
      <p id="demo">Bu yazı deneme amaçlıdır</p>
    );
  }

  return (
    <>
      <button onClick={Test}>Test</button>
      <br></br>
      {result}

      <button onClick={Test2}>Test2</button>
      
      
      <script type="text/javascript" src="https://istanbuluseyret.ibb.gov.tr/wp-content/plugins/bradmax-player/assets/js/default_player.js" id="bradmax-player-js"></script>
      <div id="bradmaxPlayer" class='playerArea'></div>
      
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);