import React from 'react'
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