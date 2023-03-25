import React, { useState, useEffect } from "react";
import Message from "./components/Message";
import { MessageInt } from "./Model";
import "../src/App.css";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const App = () => {
  const [errors, setErrors] = useState(false);
  const [messageData, setMessageData] = useState<MessageInt[]>([]);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({
      leMessage: "",
      leNom: "",
    });
    setErrors(false);
  }, [isSubmitSuccessful, reset]);

  const onError = (erreurs: any, e: any) => {
    
    erreurs ? console.log("erreurs ", errors) : console.log("ok");

    setIsSubmitSuccessful(false);
  };

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    console.log("data", data, e);
    const mess: any = {
      id: Math.round(Math.random() * Date.now()),
      nom: data.leNom,
      message: data.leMessage,
      date: Date.now(),
    };
    setIsSubmitSuccessful(true);
    setMessageData((messageData) => [...messageData, mess]);
    reset();
  };

  return (
    <div>
      <h1>POSTER UN MESSAGE ...</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          type="name"
          placeholder="Nom"
          id="name"
          className="name"
          {...register("leNom", { required: true })}
        />

        <textarea
          placeholder="Votre message"
          id="leMessage"
          {...register("leMessage", { required: true, maxLength: 1000 })}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Envoyer
        </Button>
        <br></br>
      </form>
      <div className="list-message">
        <h2>Liste des messages</h2>
        <div>
          {" "}
          {messageData?.map((lesMess) => (
            <Message
              mess={lesMess}
              messageData={messageData}
              setMessageData={setMessageData}
              key={lesMess.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
