import React from "react";
import useStyles from "./styles";

const Chat = () => {
  const classes = useStyles();

 

  return (
    <div className={classes.chat}>
      <div className="chat__header">header</div>

      <div className="chat__body">body</div>

      <div className="chat__footer">footer</div>
    </div>
  );
};

export default Chat;
