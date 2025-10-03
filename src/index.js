import React from 'react'
import ReactDOM from 'react-dom/client';
import ReactPlayer from "react-player";

function Procedures(){
  return (
    <>
      <ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);