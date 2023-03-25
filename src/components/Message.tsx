import React from "react";
import { MessageInt } from "../Model";
import "../styles/message.scss";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";


type Props = {
  mess: MessageInt;
  messageData: MessageInt[];
  setMessageData: React.Dispatch<React.SetStateAction<MessageInt[]>>;
};
const Message = ({ mess, messageData, setMessageData }: Props) => {
  const formaterDate = (date: number) => {
    return new Date(date).toLocaleDateString("FR-fr");
  };

  const handleDelete = () => {
    setMessageData(messageData.filter((el) => el.id !== mess.id));
  };

  return (
    <div className="message-container">
      <p />
      {formaterDate(mess.date)}
      <br></br> {" key "} {mess.id} <br />
      {mess.nom} <br />
      {mess.message}
      <Tooltip title="Delete">
        <IconButton onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Message;
