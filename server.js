const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())

const http = require("http").createServer(app);
io = require("socket.io")(http,{
    cors: {
        origin: ["https://chat-app-a9cfd.web.app","http://localhost:3000"],
        methods: ["GET", "POST"]
      }    
});

io.on("connection", (socket) => {
    console.log(socket.id + " connected");
    console.log(socket.broadcast.emit);
    socket.on("join-room",(user) => {
        console.log(user);
        socket.join(user.room);
        socket.broadcast.to(user.room).emit("chat-message", {name: "Server" ,message: user.name + " has joined the chat"});
        
        socket.on('chat-message', msg => {
            // console.log(msg);
            io.to(user.room).emit('chat-message', msg);
        });

    });

    socket.on("message",user => {
        console.log(user);
    })
    
});

const port = process.env.PORT || 4000;
http.listen(port,()=> {
    console.log("Hosted at port " + port);
});
