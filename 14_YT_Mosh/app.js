const EventEmitter = require('events');

const emitter = new EventEmitter

//Register a listener
emitter.on('messageLogged', function(){
    console.log('Listener called');
});

//Emit - making a noise, produce signal
//Raise an event
emitter.emit('messageLogged');