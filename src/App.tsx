import React, { useRef, useState } from "react";
import Message from "./components/Message";
import { MessageInt } from "./Model";
import "../src/App.css";

const App = () => {
  const inputMessage = useRef<HTMLInputElement>(null);
  const inputNom = useRef<HTMLInputElement>(null);
  const [messageData, setMessageData] = useState<MessageInt[]>([]);

  const handleSumit = (e: any) => {
    e.preventDefault();
    if (inputMessage) {
      const mess: MessageInt = {
        id: Math.round(Math.random() * Date.now()),
        nom: inputNom.current?.value,
        message: inputMessage.current?.value.toString(),
        date: Date.now(),
      };
     
       setMessageData((messageData) => [...messageData, mess]);
      //  setMessageData((dataActuelles) => [...dataActuelles, mess]);
    }
    (document.getElementById("inputMessage") as HTMLInputElement).value = "";
    (document.getElementById("name") as HTMLInputElement).value = "";
  };


  return (
    <div>
      <h1>POSTER UN MESSAGE</h1>
      <form
        onSubmit={(e) => {
          handleSumit(e);
        }}
      >
        <input type="nom" placeholder="Nom" id="name" ref={inputNom} />
        <input
          type="text"
          placeholder="Votre message"
          id="inputMessage"
          ref={inputMessage}
        />
        <input type="submit" value="Envoyer" />
      </form>
      <h2>Liste des messages</h2>
      <div> { messageData?.map((lesMess) => 
      (<Message mess={lesMess} messageData={messageData}
       setMessageData={setMessageData}
        key={lesMess.id}/>)) }
      </div> 
  </div>
 
);
      };
export default App;
