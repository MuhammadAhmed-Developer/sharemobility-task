async function fetchData() {
  const [usersResponse, messagesResponse] = await Promise.all([
    fetch("data/users.json"),
    fetch("data/messages.json"),
  ]);

  const users = await usersResponse.json();
  const messages = await messagesResponse.json();

  return { users, messages };
}

async function renderData() {
  const { users, messages } = await fetchData();

  // Render messages for Chat ID = 3 as HTML
  const chatId3Messages = messages.filter((msg) => msg.chatid === 3);
  const chatId3Html = chatId3Messages
    .map((msg) => `<p>${msg.message}</p>`)
    .join("");
  document.getElementById("chat-id-3").innerHTML = chatId3Html;

  // Render messages for Chat ID = 8 as JSON
  const chatId8Messages = messages.filter((msg) => msg.chatid === 8);
  document.getElementById("chat-id-8-json").textContent = JSON.stringify(
    chatId8Messages,
    null,
    2
  );

  // Render user with ID = 100 as JSON
  const userId100 = users.find((user) => user.id === 100);
  document.getElementById("user-id-100-json").textContent = JSON.stringify(
    userId100,
    null,
    2
  );

  // Render message with ID = 459 as HTML
  const messageId459 = messages.find((msg) => msg.id === 459);
  if (messageId459) {
    document.getElementById("message-id-459").textContent =
      messageId459.message;
  }
}

// Call renderData when the page loads
window.onload = renderData;
