import React from "react";
import styles from "../../styles/videoChat.module.css";

interface MessageInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendChatMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputText,
  setInputText,
  handleKeyPress,
  sendChatMessage,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles["message-input-container"]}>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className={styles["message-input"]}
        rows={4}
        placeholder="Type your message here..."
      />
      <button
        onClick={sendChatMessage}
        className={styles["send-message-button"]}
        disabled={!inputText}
      >
        Send Message
      </button>
    </div>
  );
};

export default MessageInput;
