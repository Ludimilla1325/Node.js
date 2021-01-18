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

    socket.on('disconnect',()=>{
        console.log('User disconnected from server')
    })
})

const port = process.env.PORT || 3004;
server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})