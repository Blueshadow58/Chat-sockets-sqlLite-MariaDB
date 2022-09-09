const socket = io.connect();
const button = document.getElementById("submit");

button?.addEventListener("click", () => {
  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const eValidator = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (eValidator.test(message.email)) {
    if (!message.email || !message.message) {
      alert("Recuerde ingresar su correo y el mensaje");
    } else {
      // console.log(message);
      //Guardar en doc

      socket.emit("new-message", message);
    }
  } else {
    alert("La dirección de email no es valida");
  }
});

socket.on("new-chat-message", (messages) => {
  const date = new Date();
  // British English uses day-month-year order and 24-hour time without AM/PM
  const dateFormat = date.toLocaleString();

  const html = messages
    .map((message) => {
      let contentMessage = `<div><span class="has-text-link has-text-weight-bold	" >${message.email}</span>`;
      contentMessage += `[<span style="color:#804000"> ${dateFormat}</span>]`;
      contentMessage += `:<em> <span class="is-italic	has-text-success	"> ${message.message} </span></em></div>`;
      return contentMessage;
    })
    .join(" ");

  document.getElementById("chat").innerHTML = html;
});
