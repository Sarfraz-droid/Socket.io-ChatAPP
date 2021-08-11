import React from "react";

function Chatbox(props) {
  const style = {
    backgroundColor: props.isMine ? "#f5f5f5" : "#92dae267",
    float: props.isMine ? "right" : "left",
  };
  return (
    <div>
      <div className="chatbox" style={style}>
        <h4>{props.info.name}</h4>
        <p>
          {props.info.message} {props.isMine}
        </p>
      </div>
    </div>
  );
}

export default Chatbox;
