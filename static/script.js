// Get HTML elements
var chatLog = document.getElementById('chat-log');
var userInput = document.getElementById('user-input');
var sendBtn = document.getElementById('send-btn');

// Event listener for send button click
sendBtn.addEventListener('click', function() {
    sendMessage();
});

// Event listener for Enter key press in user input
userInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

// Function to send user message and get bot response
function sendMessage() {
    var userMessage = userInput.value;

    // Append user message to chat log
    appendMessage('user', userMessage);

    // Clear user input
    userInput.value = '';

    // Send user message to backend for processing
    sendRequest(userMessage);
}

// Function to append message to chat log
function appendMessage(sender, message) {
    var messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.innerHTML = message;
    chatLog.appendChild(messageElement);

    // Scroll chat log to bottom
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to send user message to backend and receive bot response
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
