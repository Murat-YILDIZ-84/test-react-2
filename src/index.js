import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import ReactPlayer from "react-player";

function Procedures(){
  const adres = "https://test-1-k2ol.onrender.com";

  const [result, setResult] = useState(["https://livestream.ibb.gov.tr/cam_turistik/b_kapalicarsi.stream/playlist.m3u8"]);

  function Test(){
    axios(adres + "/sunucu")
    .then((res)=> setResult(res.data))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı\r\n" + e));
  }

  return (
    <>
      <button onClick={Test}>Test</button>

      <ReactPlayer
        crossorigin
        src={result}
        config={{
          file: {
            attributes: {
              crossOrigin: "true",
            }
          }
        }}
        controls
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);