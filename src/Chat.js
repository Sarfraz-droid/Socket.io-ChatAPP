import React, { useState,useEffect } from "react";
import "./scss/chat.scss";
import arrow from "./images/angle-left - Regular Straight.svg"
import plane from "./images/paper-plane - Regular Straight.svg"
import {Link} from "react-router-dom"
import { useImmer } from "use-immer";
import Chatbox from "./Components/Chatbox";

function Chat(props) {

    const [msg, setMsg] = useState('');
    const [List, setList] = useState([{name: 'Chat',message: 'Start Chatting'}]);
    
    useEffect(() => {
        props.socket.on("chat-message", function (msg){
            setList((list) => [...list, msg]);
            console.log("List" + List);
            // console.log(msg);
        })



    },[props.socket]);

    
    const sendMsg = (e) => {
        e.preventDefault();
        props.socket.emit("chat-message", { name: props.Name, message: msg });
        setMsg('');
    }

  return (
    <div className="chat-section">
      <div className="chat">
        <div className="head-section">
          <span className="go-back">
              <Link to="/">
            <img className="back" src={arrow}/>
            </Link>
          </span>
          <div className="room-name">{props.Room}</div>
        </div>
        <div className="msg-section">
            {List.map(msg => <Chatbox info={msg} isMine={props.Name === msg.name?true: false}/>)}
        </div>
        <div className="msg-send" >
            <form onSubmit={sendMsg}>
                <div className="input-msg">
                <input type="text" className="msg-input" placeholder="Enter Your Message" value={msg} onChange={(e) => setMsg(e.target.value)}/>
                <button>
                    <img src={plane}/>
                </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
