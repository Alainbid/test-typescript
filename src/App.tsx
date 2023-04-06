import React, { useState, useEffect } from "react";
import Message from "./components/Message";
import { MessageInt } from "./Model";
import "../src/App.css";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";

const App = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const [envoyer, setEnvoyer] = useState("");

  useEffect(() => {
    reset({
      message: "",
      name: "",
      email: "",
    });
  }, [isSubmitSuccessful, reset]);

  const onError = (errors: any, e: any) => {
    errors ? console.log("erreurs ", errors) : console.log("ok");
    setIsSubmitSuccessful(false);
  };

  const sendEmail = async (e: any) => {
    e.preventDefault();
    // console.log("res.status = ", e);
    let res: any = "";
    res = await emailjs.sendForm(
      
       process.env.REACT_APP_SERVICE_ID as string,
      process.env.REACT_APP_TEMPLATE_ID as string,
      e.target,
      process.env.REACT_APP_PUBLIC_KEY as string
    );
    console.log("res.status = ", res.status);
    if (res.status === 200) {
      setEnvoyer("votre message est envoyé");
      handleShow();

      // handleSubmit(onSubmit, onError)

      reset({
        name: "",
        reply_to: "",
        message: "",
        email: "",
      });
    } else {
      setEnvoyer("ERREUR message non envoyé");
      handleShow();
      //****** TODO */
    }
    setTimeout(() => handleClose(), 2000);
    return false;
  };

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    sendEmail(e)
    console.log("data", data, e);
    const mess: any = {
      id: Math.round(Math.random() * Date.now()),
      nom: data.name,
      email: data.email,
      message: data.message,
      date: Date.now(),
    };
    setIsSubmitSuccessful(true);
    setMessageData((messageData) => [...messageData, mess]);
    reset();
  };

  return (
    <div>
      <h1>POSTER UN MESSAGE ...</h1>
      {/* <form onSubmit={(e) => sendEmail(e)}> */}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="field">
          <input
            autoComplete="off"
            type="text"
            placeholder="Votre Nom ou Prénom"
            id="name"
            className="name"
            {...register("name", {
              minLength: {
                value: 3,
                message: "⚠ le nom doit avoir plus de 3 caractères",
              },
              required: "⚠ Veuillez indiquer votre nom",
            })}
          />
          {errors.name && <i> {errors.name.message?.toString()}</i>}
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Votre Email"
            id="email"
            className="email"
            {...register("email", {
              pattern: {
                value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
                message:
                  "⚠ doit contenir les caractères standards un . et un @ ",
              },
              required: "⚠ Veuillez indiquer votre email",
            })}
          />
          {errors.email && <i> {errors.email.message?.toString()}</i>}
        </div>
        <div className="field">
          <textarea
            placeholder="Votre message"
            id="leMessage"
            className="message"
            {...register("message", {
              minLength: { value: 12, message: "⚠  12 caractères minimum" },
              required: "⚠ Veuillez rédiger votre message",
            })}
          />
          {errors.message && <i> {errors.message.message?.toString()}</i>}
        </div>
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
