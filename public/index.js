//index.js
$(document).ready(() => {
    
    const socket = io.connect();
    //Keep track of the current user
    let currentUser;
    // Get the online users from the server
    socket.emit('get online users');
    
    //Users can change the channel by clicking on its name.
    $(document).on('click', '.channel', (e) => {
        let newChannel = e.target.textContent;
        socket.emit('user changed channel', newChannel);
    });
    // ============ CREATE USER ===========
    $('#createUserBtn').click((e) => {
        e.preventDefault();
        if ($('#usernameInput').val().length > 0) {
            socket.emit('new user', $('#usernameInput').val());
            // Save the current user when created
            currentUser = $('#usernameInput').val();
            $('.usernameForm').remove();
            $('.mainContainer').css('display', 'flex');
        }
    });

    $('#sendChatBtn').click((e) => {
        e.preventDefault();
        // Get the client's channel
        let channel = $('.channel-current').text();
        let message = $('#chatInput').val();
        if (message.length > 0) {
            socket.emit('new message', {
                sender: currentUser,
                message: message,
                //Send the channel over to the server
                channel: channel
            });
            $('#chatInput').val("");
        }
    });


    // create new channel button
    $('#newChannelBtn').click(() => {
        let newChannel = $('#newChannelInput').val();

        if (newChannel.length > 0) {
            // Emit the new channel to the server
            socket.emit('new channel', newChannel);
            $('#newChannelInput').val("");
        }
    })

    

    //socket listeners
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat`);
        $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
    })

    //Output the new message
    socket.on('new message', (data) => {
        //Only append the message if the user is currently in that channel
        let currentChannel = $('.channel-current').text();
        if (currentChannel == data.channel) {
            $('.messageContainer').append(`<div class="message">
            <p class="messageUser">${data.sender}: </p>
            <p class="messageText">${data.message}</p>
            </div>
            `);
        }
    })


    // Get the online users and display on the page
    socket.on('get online users', (onlineUsers) => {
        //You may have not have seen this for loop before. It's syntax is for(key in obj)
        //Our usernames are keys in the object of onlineUsers.
        for (username in onlineUsers) {
            $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
        }
    })

    //Refresh the online user list
    socket.on('user has left', (onlineUsers) => {
        $('.usersOnline').empty();
        for (username in onlineUsers) {
            $('.usersOnline').append(`<p>${username}</p>`);
        }
    });

    // Add the new channel to the channels list (Fires for all clients)
    socket.on('new channel', (newChannel) => {
        $('.channels').append(`<div class="channel">${newChannel}</div>`);
    });

    // Make the channel joined the current channel. Then load the messages.
    // This only fires for the client who made the channel.
    socket.on('user changed channel', (data) => {
        $('.channel-current').addClass('channel');
        $('.channel-current').removeClass('channel-current');
        $(`.channel:contains('${data.channel}')`).addClass('channel-current');
        $('.channel-current').removeClass('channel');
        $('.message').remove();
        data.messages.forEach((message) => {
            $('.messageContainer').append(`<div class="message">
            <p class="messageUser">${message.sender}: </p>
            <p class="messageText">${message.message}</p>
            </div>
        `);
        });
    })
})