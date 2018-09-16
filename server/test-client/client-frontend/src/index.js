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
/* Render messages
/**/
function showMessages(messages) {
    const parent = document.getElementById('incoming')
    let lastChild;
    while (lastChild = parent.lastChild) parent.removeChild(lastChild)
    const messagesElem = document.createElement('div');
    messages.forEach(msg => {
        const newMsg = document.createElement('div');
        for (let field in msg) {
            const fieldNode = document.createElement('p');
            fieldNode.innerHTML = ` ${field}: ${msg[field]} `
            newMsg.appendChild(fieldNode)
        }
        messagesElem.appendChild(newMsg)
    })
    document.getElementById('incoming').appendChild(messagesElem);
}
/**/
/* Set user id into local storage and read it immidiately after
/**/
function getUserId() {
    let storedUser = localStorage.getItem('widget-user')
    if (!storedUser) {
        localStorage.setItem('widget-user', `${String(Math.random()).slice(2)}${Date.now()}`)
        storedUser = localStorage.getItem('widget-user')
    }
    return storedUser
}

const connection = connect('localhost', '8081').then(server => {
    let storedUser = getUserId()
    /**/
    /* Sending initial message containing user id
    /**/
    let dataToSend = { initialId: storedUser }
    server.send(JSON.stringify(dataToSend)) 
    /**/
    /* Rendering messages
    /**/
    server.onmessage = function(event) {
        let data = JSON.parse(event.data)
        showMessages(data.messages);
    };
    /**/
    /* Form submit handler
    /**/
    document.forms.widget.onsubmit = function(e) {
        e.preventDefault()
        let storedUser = getUserId()    
        let dataToSend = {
            id: storedUser,
            messages: [
                { 
                    type: 'user',
                    text: this.message.value,
                    date: new Date()
                }
            ]
        }           
        server.send(JSON.stringify(dataToSend));
    };
})
