import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import ReactPlayer from "react-player";

function Procedures(){
  const adres = "https://test-1-k2ol.onrender.com";

  const [result, setResult] = useState([""]);

  function Test(){
    axios(adres + "/sunucu")
    .then((res)=> setResult(res.data))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı\r\n" + e));
  }

  return (
    <>
      <link href="https://vjs.zencdn.net/7.2.3/video-js.css" rel="stylesheet"></link>
      <script src="https://vjs.zencdn.net/ie8/ie8-version/videojs-ie8.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.14.1/videojs-contrib-hls.js"></script>
      <script src="https://vjs.zencdn.net/7.2.3/video.js"></script>

      <button onClick={Test}>Test</button>

      <ReactPlayer src={result}
      config="{
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin'
      }"/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);