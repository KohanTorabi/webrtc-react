import React, { useState } from "react";
import styles from "../../styles/videoChat.module.css";

interface HintMessageProps {
  message: string | null;
}

const HintMessage: React.FC<HintMessageProps> = ({ message }) => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <div className={styles["hint-message"]} onClick={() => setShow(false)}>
          <p> {message}</p>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default React.memo(HintMessage);
