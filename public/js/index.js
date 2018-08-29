var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
    
    // socket.emit('createMessage', {
    //     to: "nathalie@gmail.com",
    //     text: "Hi Saphira cutie"
    // })
})
socket.on('disconnect', () => {
    console.log('Disconected to secrver');
})

socket.on('newMessage', (message) => {
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
})

socket.on('newLocationMessage', (locationMessage) => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${locationMessage.from}: `);
    a.attr('href', locationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
})

socket.emit('createMessage', {
    from: "Frank",
    text: 'Hi'
}, function () {
    console.log('Got it');
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Anynomous',
        text:jQuery('[name=message]').val()
    }, function(){

    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not support by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function (position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
        });
    }, function (){
        alert('Unable to fetch location');
    })
})