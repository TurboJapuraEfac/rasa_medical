const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${message}`;
    chatDisplay.appendChild(messageDiv);
}

function sendMessage() {
    const message = userInput.value;
    appendMessage(message, 'You');

    fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then((response) => response.json())
    .then((data) => {
        const botReply = data[0].text;
        appendMessage(botReply, 'Bot');
    })
    .catch((error) => console.error('Error:', error));

    userInput.value = '';
}
