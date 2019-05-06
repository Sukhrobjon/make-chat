//App.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
//Socket.io has to use the http server
const server = require('http').Server(app);

//Socket.io connection with server
const io = require('socket.io')(server);
// store online users
let onlineUsers = {}
// save the channels in this object
let channels = {"General": []}
io.on("connection", (socket) => {
    // This file will be read on new socket connections
    require('./sockets/chat.js')(io, socket, onlineUsers, channels);
    console.log("🔌 New user connected! 🔌");

})


//Express View Engine for Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Establish the connection with external files
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index.handlebars');
})

server.listen(port, () => {
    console.log('Server listening on Port 3000');
})