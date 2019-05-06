1. Build out a basic view [DONE]
    - Install/integrate dependencies
    - Implement a basic, index view
2. Integrate sockets[DONE]
    - Import socket.io and open a connection on the server side
    - Update the front end (client) to accept connections as well
    - Open up real time communication
3. Implement user form[DONE]
    - Pass the socket server and the socket itself
    - Build out the structure of the user form
    - Send info from the client to the server using the user form
    - Send info from the server to all clients
4. Style and send messages[DONE]
    - Implement the styles for the app
    - Send messages using sockets
    - Listen for messages using sockets
5. Connect/disconnect users[DONE]
    - Save the onlineUsers object
    - Display the online users
    - Remove users when they leave the app
6. Create/persist/join channels[DONE]
    - Create a button to generate a new channel
    - Persist channels locally
    - Join other channels
    - Ensure messages go to their designated channels
    - Allow users to change channels