import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import ReactPlayer from "react-player";

function Procedures(){
  const adres = "https://test-1-k2ol.onrender.com";

  const [result, setResult] = useState([]);

  function Test(){
    axios(adres + "/sunucu")
    .then((res)=> setResult(res.data))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı\r\n" + e));
  }

  useEffect(() => {
    fetch('https://livestream.ibb.gov.tr/cam_turistik/b_kapalicarsi.stream/playlist.m3u8', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*'
        },
    })
    .then(data => setResult(data))
  }, []);

  return (
    <>
      <button onClick={Test}>Test</button>

      {result}

    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);