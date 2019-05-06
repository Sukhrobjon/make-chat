//chat.js
module.exports = (io, socket, onlineUsers, channels) => {

    socket.on('new user', (username) => {
        onlineUsers[username] = socket.id;
        socket["username"] = username
        console.log(`✋ ${username} has joined the chat! ✋`);
        io.emit("new user", username);
    })

    //Listen for new messages
    socket.on('new message', (data) => {
        // Send that data back to ALL clients
        console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
        io.emit('new message', data);
    })

    // send the online users when someone connects.
    socket.on('get online users', () => {
        //Send over the onlineUsers
        socket.emit('get online users', onlineUsers);
    })

    //This fires when a user closes out of the application
    socket.on('disconnect', () => {
        //This deletes the user by using the username we saved to the socket
        delete onlineUsers[socket.username]
        io.emit('user has left', onlineUsers);
    });

    // ============= NEW CHANNEL ==============
    socket.on('new channel', (newChannel) => {
        //Save the new channel to our channels object. The array will hold the messages.
        channels[newChannel] = [];
        //Have the socket join the new channel room.
        socket.join(newChannel);
        //Inform all clients of the new channel.
        io.emit('new channel', newChannel);
        //Emit to the client that made the new channel, to change their channel to the one they made.
        socket.emit('user changed channel', {
            channel: newChannel,
            messages: channels[newChannel]
        });
    })

}
