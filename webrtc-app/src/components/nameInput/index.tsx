import React from "react";
import styles from "../../styles/videoChat.module.css";

interface NameInputProps {
  setInputNameValue: (value: string) => void;
  setName: (name: string) => void;
  inputNameValue: string;
}

const NameInput: React.FC<NameInputProps> = ({
  setInputNameValue,
  setName,
  inputNameValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value);
  };

  const handleSubmit = () => {
    setName(inputNameValue);
  };

  return (
    <div className={styles["name-input-container"]}>
      <label>Your Name:</label>
      <input
        type="text"
        placeholder="Please enter your name"
        required
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit} disabled={!inputNameValue}>
        Submit
      </button>
    </div>
  );
};

export default NameInput;
