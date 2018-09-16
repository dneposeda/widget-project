
// Initialize Firebase
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");
const config = {
    apiKey: "AIzaSyCi6GgTgfvQn9N_n5U2VbCcLW0setuiCD4",
    authDomain: "widget-project-e0d47.firebaseapp.com",
    databaseURL: "https://widget-project-e0d47.firebaseio.com",
    projectId: "widget-project-e0d47",
    storageBucket: "widget-project-e0d47.appspot.com",
    messagingSenderId: "111641089365"
};
firebase.initializeApp(config);


/**/
/*Helper Functions:
/**/ 
/**/
/* Set data to the database
/**/ 
function writeUserData({ id, messages }) {
    let user = firebase.database().ref(`users/${id}`)
    messages.forEach(currentMessage => {
        let newMessage = user.push()
        newMessage.set(currentMessage)
    })
    sendHistoryToManager(clients, firebase)
}
/**/
/* Send messages history 
/**/ 
function sendHistory (id, ws, db) {
    let users = db.database().ref()
    users.on('value', function(snapshot) {
        let db = snapshot.val()
        let users = db ? db.users : {}
        if (id) {
            console.log(`Sending history to the client, ${id}`)
            let currentUser = users[id]
            let messages = []
            for (let entry in currentUser) {
                messages.push(currentUser[entry])
            }
            ws.send(JSON.stringify({id, messages}))
        } else {
            let usersData = {users: [], online: Object.keys(clients)}
            for (let userId in users) {
                let innerUser = users[userId]
                let userData = {id: userId, messages: []}
                for (let innerUserId in innerUser) {
                    let entry = innerUser[innerUserId]
                    userData.messages.push(entry)
                }
                usersData.users.push(userData)
            }
            ws.send(JSON.stringify(usersData))
        }
    });

}
/**/
/* Send history merely to the manager
/**/ 
function sendHistoryToManager(clients, db) {
    if (clients['manager']) {
        console.log('Updating manager\'s history')
        sendHistory(null, clients['manager'], db)
    }
}





/**/
/* Websocket server
/**/
let clients = {};

let WebSocketServer = new require('ws');
let webSocketServer = new WebSocketServer.Server({
  port: 8081
});
console.log('server listens on port 8081')

/**/
/* Setting main events
/**/
webSocketServer.on('connection', ws => {
        let id;
        console.log('opening connection')
        
        ws.on('message', event => {
            let data = JSON.parse(event)
            if (data.initialId) {
                /**/
                /* Initializing new client
                /**/
                console.log(`GOT INITIAL MESSAGE', ID: ${data.initialId}`)
                id = data.initialId
                clients[id] = ws
                console.log(`New connection: ${id}`)
                sendHistory(id, ws, firebase)
                sendHistoryToManager(clients, firebase)
            } else if (data.getAllUsers) {
                /**/
                /* Initializing manager
                /**/
                id = data.id
                clients[id] = ws
                console.log(`New connection: ${data.id}`)
                sendHistory(null, ws, firebase)
            } else {
                /**/
                /* Default message receiving
                /**/
                writeUserData(data)
            }
        })
        
        ws.on('close', () => {
            console.log(`Connection closed: ${id}`)
            delete clients[id]
            sendHistoryToManager(clients, firebase)
        })
    }
)






