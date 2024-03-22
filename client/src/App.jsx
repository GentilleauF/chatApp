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
    const dateFull = (new Date(message.date)).toUTCString();
    const date = (new Date(message.date));
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    const alignment = message.author === author ? 'items-end' : 'items-start';
    const colorDiv = message.author === author ? 'bg-green-300' : 'bg-blue-400'

    return (
      <div key={i} className={`message w-[50%] p-2 m-3 rounded flex flex-col ${alignment} ${colorDiv} `}>

        <p>{message.content}</p>
        <div className='flex flex-row'>
          <p className='pr-2'>{message.author}</p>
          <p>{time}</p>
        </div>


      </div>
    );
  });


  return (
    <div className='min-h-screen bg-slate-500'>
      <h1 className='text-xl text-center font-medium p-10'>Client Chat</h1>
      <h1 className='text-xl text-center font-medium '>Hello {author}</h1>

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


      <div className='bg-white mx-36 mt-20 flex flex-col items-center rounded  '>
        {messageElements}

      </div>
      <form className='mx-36 mt-5 flex justify-center' onSubmit={sendMessage} hidden={author == null}>
        <input className='rounded w-[30%]' type="text" id="message" />
        <button className='bg-slate-300 p-2 mx-2 rounded'>Envoyer</button>
      </form>

    </div>
  )
}

export default App


