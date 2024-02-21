import { useState } from 'react'

function App({ socket }) {
  const [author, setAuthor] = useState(null);
  const [messages,setMessages] = useState([]);


  function sendMessage(event) {
    event.preventDefault();
    const content = event.target.querySelector("#message").value;
    const msg = {
      content: content,
      date: Date.now(),
      author: author
    }
    socket.emit("send_msg", msg); // Envoi du message au serveur
  }

  function handleConnexion(event) {
    event.preventDefault();
    const author = event.target.querySelector("#author").value;
    setAuthor(author);

    socket.on("new_msg", (newMessage) =>{
      setMessages((prevMessages) =>[
        ...prevMessages, newMessage
      ]);
    });
  }


  const messageElements = messages.map((message,i)=>{
    const date = (new Date(message.date)).toUTCString();
    return (
    <div key={i} className="message">
    <p>{message.content}</p>
    <p>{message.author}</p>
    <p>{date}</p>
    </div>
    );
    });


  return (
    <div>
      <h1>Client Chat</h1>
      <form onSubmit={handleConnexion} hidden={author != null}>
        <input type="text" id="author" />
        <button >Se connecter</button>
      </form>
      <form onSubmit={sendMessage} hidden={author == null}>
        <input type="text" id="message" />
        <button>Envoyer</button>
      </form>
      <div>
        {messageElements}
      </div>
    </div>
  )
}

export default App
