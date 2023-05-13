import React, { useState } from "react";
import axios from "axios";

const Pythonview = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {
    console.log(code);
    const config = {
      headers: {
        "content-type": "text/plain",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/v1.0/getPythonCode",
        code,
        config
      );
      console.log(data);
      setMessage(data.message);
      setOutput(data.output);
      setError(data.stdout);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>
        Online Python Code Compiler
        <br />
        <textarea
          rows="20"
          cols="75"
          valus={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
        <p>{output}</p>
        <p>{error}</p>
      </h1>
    </>
  );
};

export default Pythonview;
