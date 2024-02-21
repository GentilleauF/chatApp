import { useState } from 'react'

function App({ socket }) {
  const [author, setAuthor] = useState(null);
  const [messages, setMessages] = useState([]);


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

    socket.on("new_msg", (newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages, newMessage
      ]);
    });
  }


  const messageElements = messages.map((message, i) => {
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
    <div className='min-h-screen bg-slate-500'>
      <h1 className='text-xl text-center font-medium p-10'>Client Chat</h1>
      <div className='bg-slate-200 rounded absolute top-20 inset-x-1/4 h-60 ' hidden={author != null}>
        <form className='flex flex-col ' onSubmit={handleConnexion} >
          <div>
            <h3 className='text-center m-10 font-medium'>Formulaire de Connexion</h3>
            <div className='flex justify-center item-center'>
              <input className='mr-5' type="text" id="author" />
              <button className='bg-blue-400 p-1 px-3 rounded' >Se connecter</button>
            </div>
          </div>
        </form>
      </div>

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
