var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
    
    socket.emit('createMessage', {
        to: "nathalie@gmail.com",
        text: "Hi Saphira cutie"
    })
})
socket.on('disconnect', () => {
    console.log('Disconected to secrver');
})

socket.on('newMessage', (message) => {
    console.log('New Message', message);

})