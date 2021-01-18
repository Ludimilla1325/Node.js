const express = require ('express');
const http = require ('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/../public'));

//on- gonna be listening for something, 1st event is connection, receiving a connection
//In this case we r listening for connections
io.on('connection',(socket)=>{
    console.log('someone is connected');

    socket.on('join',(data)=>{
        console.log(data)

        socket.join("room-" + data.room);

        socket.broadcast.to("room-" + data.room).emit('userJoined',`${data.user} joined the room`);
    });


    // socket.on('sendMess',(newMessage,cb)=>{
    //     console.log('New message',newMessage);

    //     //EMIT- we want emit something, BROADCAST- we gonna send the messages to users that is chatting with you
    //     socket.broadcast.emit('newMessage',{ //with io u send message to everybody and with socket, just to a socket
    //     from:"anita",
    //     message:"Im a crazy message"  
    // });

    // cb('ok')
    
    // })

    socket.on('disconnect',()=>{
        console.log('User disconnected from server')
    })
})

const port = process.env.PORT || 3004;
server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})