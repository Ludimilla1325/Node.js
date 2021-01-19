const EventEmitter = require('events');

const emitter = new EventEmitter

//Register a listener
emitter.on('messageLogged',(arg)=>{
    console.log('Listener called', arg);
});

//Emit - making a noise, produce signal
//Raise an event
emitter.emit('messageLogged',{
    id:1,
    url:'http://'
});