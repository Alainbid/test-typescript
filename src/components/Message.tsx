import React from 'react';
import { MessageInt } from '../Model';

type Props = {
mess :MessageInt;
messageData : MessageInt[];
setMessageData:React.Dispatch<React.SetStateAction<MessageInt[]>>
}
const Message = ({mess , messageData, setMessageData} : Props) => {
const formaterDate = (date:number) => {
  return new Date(date).toLocaleDateString("FR-fr");
}

const handleDelete = () => {
  setMessageData( messageData.filter((el) => el.id !== mess.id))
}


  return (
   <div className="message-container">
    <p>{formaterDate(mess.date)}<br></br> {" key "} {mess.id} <br></br>
    {mess.nom}{' '} <br></br>{mess.message}
    <span id='delete' onClick={() => handleDelete()}>&#10008;</span>
    </p>
    
    

   </div>
  );
};

export default Message;