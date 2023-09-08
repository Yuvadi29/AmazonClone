import { useState } from "react";

const Chatbot = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section
      className="fixed right-4 bottom-4 bg-transparent text-white py-2 px-4 rounded-full cursor-pointer"
    >
      <div className="cursor-pointer" onClick={handleToggle}>
        {toggle ? (
          // Displaying the close icon when toggle is true
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 80 80"
          >
            <line x1="10" y1="10" x2="70" y2="70" stroke="gray" strokeWidth="5" />
            <line x1="10" y1="70" x2="70" y2="10" stroke="gray" strokeWidth="5" />
          </svg>
        ) : (
          // Displaying the chat icon when toggle is false
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 80 80"
          >
            {/* Your chat SVG content here */}
            <circle cx="40" cy="40" r="30" fill="gray" />
            <text x="23" y="46" fill="white">Chat</text>
          </svg>
        )}
      </div>

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
