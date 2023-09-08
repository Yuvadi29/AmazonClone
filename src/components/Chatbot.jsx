"use client";
import { useState } from "react";

const Chatbot = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <section className="bg-red-400 absolute bottom-100 ">
      <button onClick={() => setToggle(!toggle)}>Click Chat</button>
      {toggle && (
        <>
          <iframe
            className=""
            allow="microphone;"
            width="330"
            height="500"
            src="https://console.dialogflow.com/api-client/demo/embedded/5d066317-9c30-44d2-82fe-aa83e0f97cf9"
          ></iframe>
        </>
      )}
    </section>
  );
};

export default Chatbot;