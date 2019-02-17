const socket = io("/");

const input = document.getElementById("username");
const btn = document.getElementById("submitUsername");
const loginForm = document.getElementById("login");
const messageForm = document.getElementById("message");
const messageBtn = messageForm.querySelector("button");
const messageInput = messageForm.querySelector("input");
const messageList = document.getElementById("messageList");
const notifications = document.getElementById("notifications");

messageForm.style.display = "none";

btn.addEventListener("click", () => {
  const { value } = input;
  socket.emit("logIn", { value });
  loginForm.style.display = "none";
  messageForm.style.display = "block";
});

messageBtn.addEventListener("click", () => {
  const { value } = messageInput;
  socket.emit("newMessage", { value });
  addMessage("You", value);
  messageInput.value = "";
});

socket.on("newPerson", data => {
  const { value } = data;
  notifications.innerText = `${value} just joined`;
  setTimeout(() => (notifications.innerText = ""), 3000);
});

socket.on("newMessageReceived", data => {
  const { from, message } = data;
  addMessage(from, message);
});

const addMessage = (from, message) => {
  const newMessage = document.createElement("li");
  newMessage.innerText = `${from}: ${message}`;
  messageList.prepend(newMessage);
};
