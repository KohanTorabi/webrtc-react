import React, { useRef, useState } from "react";
import { SERVER_URL } from "../../constants";
import { useWebRTC } from "../../hooks/useWebRTC";
import styles from "../../styles/videoChat.module.css";
import ErrorMessage from "../errorMessage";
import HintMessage from "../hintMessage";
import Message from "../message";
import MessageInput from "../messageInput";
import NameInput from "../nameInput";
import Video from "../video";

const VideoChat = () => {
  const {
    localStream,
    remoteStream,
    chatMessages,
    inputText,
    setInputText,
    sendChatMessage,
    initiateCall,
    name,
    setName,
    error,
    setError,
  } = useWebRTC(SERVER_URL);

  const [inputNameValue, setInputNameValue] = useState("");

  const messagesListRef = useRef<HTMLDivElement>(null);

  const handleSendChatMessage = () => {
    sendChatMessage();

    setTimeout(() => {
      // Scroll messagesListRef to bottom
      if (messagesListRef.current) {
        messagesListRef.current.scrollTop =
          messagesListRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  };

  return (
    <div className={styles["video-chat-container"]}>
      <h1>WebRTC Chat</h1>

      {error && <ErrorMessage error={error} setError={setError} />}

      <div className={styles["videos-container"]}>
        {localStream && (
          <div>
            <h2>{name ? `${name}'s` : "Your"} Video</h2>
            <Video
              srcObject={localStream}
              autoPlay
              muted
              width={400}
              height={300}
              className={styles["local-video"]}
              id="local-video"
            />
          </div>
        )}
        {remoteStream && (
          <div>
            <h2>Peer's Video</h2>
            <Video
              srcObject={remoteStream}
              autoPlay
              width={400}
              height={300}
              className={styles["remote-video"]}
              id="remote-video"
            />
          </div>
        )}
      </div>
      <div className={styles["controls-container"]}>
        <HintMessage
          message={`To initiate a call, make sure you have opened two identical tabs. In each tab, enter your name, then click on the "Call" button.`}
        />
        {chatMessages?.length >= 1 && (
          <div className={styles["messages-list-container"]}>
            <label>Messages</label>
            <div className={styles["messages-list"]} ref={messagesListRef}>
              {chatMessages.map((message, index) => (
                <Message
                  name={message.name}
                  text={message.text}
                  timestamp={message.timestamp}
                  mine={message.name === name}
                  key={message.text + index}
                />
              ))}
            </div>
          </div>
        )}
        {(name?.length || 0) === 0 ? (
          <NameInput
            setInputNameValue={setInputNameValue}
            setName={setName}
            inputNameValue={inputNameValue}
          />
        ) : (
          <>
            {remoteStream ? (
              <MessageInput
                inputText={inputText}
                setInputText={setInputText}
                handleKeyPress={handleKeyPress}
                sendChatMessage={handleSendChatMessage}
              />
            ) : (
              <button className={styles["call-button"]} onClick={initiateCall}>
                Call
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
