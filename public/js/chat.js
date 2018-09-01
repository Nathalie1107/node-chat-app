var socket = io();

function scrollToBottom() {
    //selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        console.log(clientHeight + scrollTop + newMessageHeight + lastMessageHeight);
        console.log(scrollHeight);
        console.log('------');
        console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href='/'
        } else {
            console.log('No error');
        }
    })
})
socket.on('disconnect', () => {
    console.log('Disconected to secrver');
})

socket.on('updateUserList', function(users){
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    })

    jQuery('#users').html(ol);
})

socket.on('newMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();
})

socket.on('newLocationMessage', (locationMessage) => {
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);

    scrollToBottom();

})

// socket.emit('createMessage', {
//     from: "Frank",
//     text: 'Hi'
// }, function () {
//     console.log('Got it');
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTbx = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'Anynomous',
        text:messageTbx.val()
    }, function(){
        messageTbx.val('');
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not support by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Send location...');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
        });
    }, function (){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
})