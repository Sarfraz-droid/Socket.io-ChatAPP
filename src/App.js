import React, { useState } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    useHistory,
  } from "react-router-dom";
import Form from "./Form";
import Chat from "./Chat";
import io from "socket.io-client";
// 
const socket = io("https://guarded-scrubland-22840.herokuapp.com/");
console.log(socket);
function App() {

    const [Room, setRoom] = useState('');
    const [Name, setName] = useState('');

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
