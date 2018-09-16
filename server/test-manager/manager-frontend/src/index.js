if (!window.WebSocket) {
    document.body.innerHTML = 'WebSocket is not supported in this browser.';
}
/**/
/* Initializing websocket connection
/**/
console.log('Connecting to ws server')
function connect (url, port) {
    return new Promise((resolve, reject) => {
        var server = new WebSocket(`ws://${url}:${port}`);
        server.onopen = function() {
            resolve(server);
        };
        server.onerror = function(err) {
            reject(err);
        };
    });
}

/**/
/* Helper functions:
/**/
/**/
/* Render users info for testing purposes
/**/
function showUsers(users, online) {
    let list = document.getElementById('incoming')
    let lastChild;
    while (lastChild = list.lastChild) list.removeChild(lastChild)
    for (let user of users) {
        debugger
        let newUser = document.createElement('li')
        let isOnline = online ? online.some(userId => userId === user.id) : false
        newUser.innerHTML = `User id: ${user.id}, messages amount: ${user.messages.length}, online: ${isOnline}`
        list.appendChild(newUser)
    }    
}

let online = []
let storedUsers = {}

const connection = connect('localhost', '8081').then(server => {
    /**/
    /* Sending initial message to the server
    /**/
    let usersRequest = {getAllUsers: true, id: 'manager'}
    server.send(JSON.stringify(usersRequest)) 
    /**/
    /* Handling receiving messages
    /**/
    server.onmessage = function(event) {
        let data = JSON.parse(event.data)
        let { online, users } = data
        storedUsers = users
        showUsers(users, online);
    };
    /**/
    /* Sending messages handler, will send message to random stored user
    /**/
    document.forms.widget.onsubmit = function(e) {
        e.preventDefault()
        let randomUser = storedUsers[Math.floor(Math.random() * Object.keys(storedUsers).length)].id
        let dataToSend = {
            id: randomUser,
            messages: [
                { 
                    type: 'manager',
                    text: this.message.value,
                    date: new Date()
                }
            ]
        }
        server.send(JSON.stringify(dataToSend));
    };
})
