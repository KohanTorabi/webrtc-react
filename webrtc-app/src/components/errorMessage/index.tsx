import React from "react";
import styles from "../../styles/videoChat.module.css";

export type Error = {
  type: string;
  message: string;
};

interface ErrorMessageProps {
  error: Error | null;
  setError: (error: Error | null) => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, setError }) => {
  const handleClick = () => {
    setError(null);
  };

  return (
    <div className={styles["error-message"]} onClick={handleClick}>
      <p>Error: {error?.message}</p>
    </div>
  );
};

export default React.memo(ErrorMessage);
