const socket = io();
let username = prompt('Enter your name:');
if (!username) username = 'Anonymous';

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('chat-container');

// Typing indicator setup
const typingDiv = document.createElement('div');
typingDiv.id = 'typing-indicator';
messages.appendChild(typingDiv);

let typingTimeout;

// Function to generate pastel color based on username
function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 85%)`;
}

// Function to add a message to the chat
function addMessage({ user, text, time }) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.style.backgroundColor = getColor(user);
  msgDiv.innerHTML = `
    <strong>${user}</strong>: ${text}
    <div class="timestamp">${time}</div>
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Send message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    socket.emit('chat message', {
      user: username,
      text: message,
      time
    });
    input.value = '';
    socket.emit('stop typing', username);
  }
});

// Typing events
input.addEventListener('input', () => {
  socket.emit('typing', username);
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('stop typing', username);
  }, 1500);
});

// Receive chat message
socket.on('chat message', (msg) => {
  addMessage(msg);
});

// Show typing indicator
socket.on('typing', (user) => {
  if (user !== username) {
    typingDiv.textContent = `${user} is typing...`;
  }
});

socket.on('stop typing', (user) => {
  if (user !== username) {
    typingDiv.textContent = '';
  }
});

// Optional: Emoji picker support
const picker = document.querySelector('emoji-picker');
if (picker) {
  picker.addEventListener('emoji-click', event => {
    input.value += event.detail.unicode;
    input.focus();
  });
}
const emojiBtn = document.getElementById('emoji-button');
const emojiPicker = document.getElementById('emoji-picker');
const messageInput = document.getElementById('message-input');

// Toggle emoji picker
emojiBtn.addEventListener('click', () => {
  emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

// Insert emoji into input
emojiPicker.addEventListener('emoji-click', (event) => {
  const emoji = event.detail.unicode;
  messageInput.value += emoji;
  emojiPicker.style.display = 'none';
});
