import React from "react";
import styles from "../../styles/videoChat.module.css";

interface MessageProps {
  name: string;
  text: string;
  timestamp: number;
  mine: boolean;
}

const Message: React.FC<MessageProps> = ({ name, text, timestamp, mine }) => {
  return (
    <div className={styles[mine ? "my-message" : "other-message"]}>
      <div className={styles["message-name"]}>{name}</div>
      <p>
        {text}
        <span className={styles["time"]}>
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </p>
    </div>
  );
};

export default React.memo(Message);
