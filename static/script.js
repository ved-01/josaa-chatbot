
var chatLog = document.getElementById('chat-log');
var userInput = document.getElementById('user-input');
var sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', function() {
    sendMessage();
});

userInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

function sendMessage() {
    var userMessage = userInput.value;

    appendMessage('user', userMessage);

    userInput.value = '';

    sendRequest(userMessage);
}

function appendMessage(sender, message) {
    var messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.innerHTML = message;
    chatLog.appendChild(messageElement);

    chatLog.scrollTop = chatLog.scrollHeight;
}

function sendRequest(userMessage) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/chat', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('user_input=' + userMessage);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var botResponse = xhr.responseText;
            appendMessage('bot', botResponse);
        }
    };
}
