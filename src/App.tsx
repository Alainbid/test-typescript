import React, { useState, useEffect } from "react";
import Message from "./components/Message";
import { MessageInt } from "./Model";
import "../src/App.css";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const App = () => {
  const [messageData, setMessageData] = useState<MessageInt[]>([]);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    // setError,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      leMessage: "",
      leNom: "",
      leEmail: "",
    });
  }, [isSubmitSuccessful, reset]);

  const onError = (errors: any, e: any) => {
    errors ? console.log("erreurs ", errors) : console.log("ok");
    setIsSubmitSuccessful(false);
  };

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    console.log("data", data, e);
    const mess: any = {
      id: Math.round(Math.random() * Date.now()),
      nom: data.leNom,
      email: data.leEmail,
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
          autoComplete="off"
          type="text"
          placeholder="Votre Nom ou Prénom"
          id="name"
          className="name"
          {...register("leNom", {
            minLength: {
              value: 3,
              message: "⚠ le nom doit avoir plus de 3 caractères",
            },
            required: "⚠ Veuillez indiquer votre nom",
          })}
        />
        {errors.leNom && <i> {errors.leNom.message?.toString()}</i>}

        <input
          type="email"
          placeholder="Votre Email"
          id="email"
          className="email"
          {...register("leEmail", {
            pattern: {
              value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
              message: "⚠ doit contenir les caractères standards un . et un @ ",
            },
            required: "⚠ Veuillez indiquer votre email",
          })}
        />
        {errors.leEmail && <i> {errors.leEmail.message?.toString()}</i>}

        <textarea
          placeholder="Votre message"
          id="leMessage"
          {...register("leMessage", {
            minLength: { value: 12, message: "⚠  12 caractères minimum" },
            required: "⚠ Veuillez rédiger votre message",
          })}
        />
        {errors.leMessage && <i> {errors.leMessage.message?.toString()}</i>}

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
