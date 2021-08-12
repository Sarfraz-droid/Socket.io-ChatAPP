import React, { useState,useEffect } from "react";
import "./scss/chat.scss";
import arrow from "./images/angle-left - Regular Straight.svg"
import plane from "./images/paper-plane - Regular Straight.svg"
import {Link} from "react-router-dom"
import { useImmer } from "use-immer";
import { useHistory } from 'react-router-dom';
import io from "socket.io-client";

import Chatbox from "./Components/Chatbox";
import Servermsg from "./Components/Servemsg"

import ScrollableFeed from 'react-scrollable-feed'

function Chat(props) {
  const History = useHistory();

    const [msg, setMsg] = useState('');
    const [List, setList] = useState([{name: 'Server',message: 'Start Chatting',isServer: true}]);
    
    useEffect(() => {
        props.socket.on("chat-message", function (msg){
            setList((list) => [...list, msg]);
            console.log("List" + List);
            // console.log(msg);
        })



    },[props.socket]);

    
    const sendMsg = (e) => {
        e.preventDefault();
        props.socket.emit("chat-message", { name: props.Name, message: msg ,  room : props.Room });
        setMsg('');
    }

  return (
    <div className="chat-section">
      <div className="chat">
        <div className="head-section">
          <span className="go-back">
            <img className="back" src={arrow} onClick={() => {
              setList([]);
              History.goBack();
              props.socket.emit("leave-room",{ name: props.Name, room: props.Room });
            }
            }/>
          </span>
          <div className="room-name">{props.Room}</div>
        </div>
        <ScrollableFeed className="msg-section">
            {List.map((msg) => {
              if(msg.isServer===undefined)
                return(<Chatbox info={msg} isMine={props.Name === msg.name?true: false}/>)
              else
                return(<Servermsg message={msg.message}/>)
            })}
        </ScrollableFeed>
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
