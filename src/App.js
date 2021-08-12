import React, { useState,useEffect } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    useHistory,
  } from "react-router-dom";
import Form from "./Form";
import Chat from "./Chat";
import io from "socket.io-client";
// https://guarded-scrubland-22840.herokuapp.com/
let socket = io("http://localhost:4000");

function App() {

    const [Room, setRoom] = useState('');
    const [Name, setName] = useState('');
    console.log(socket);


  return (
      <div>
          <BrowserRouter>
            <Switch>

                <Route path="/chat">
                    <Chat Room={Room} Name={Name} socket={socket}/>
                </Route>
                <Route path="/">
                    <Form Room={Room} setRoom={setRoom} Name={Name} setName={setName} socket={socket}/>
                </Route>

            </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
