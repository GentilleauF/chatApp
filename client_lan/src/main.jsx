import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {io} from "socket.io-client";


const socket = io("localhost:3000");

// const msg = {
//   content : "Mon message",
//   date : Date.now(),
//   author : "Martin"
// }

// socket.emit("send_msg", msg)





socket.on("new_msg", (newMessage) =>{
  console.log(newMessage);
} )


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
)
