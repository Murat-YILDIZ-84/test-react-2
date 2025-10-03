import React from 'react'
import ReactDOM from 'react-dom/client';
import ReactPlayer from "react-player";

function Procedures(){
  return (
    <>
      <ReactPlayer src='https://livestream.ibb.gov.tr/cam_turistik/b_kapalicarsi.stream/playlist.m3u8' />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);