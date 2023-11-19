import React, { useEffect, useState, useRef } from "react";
import { useChatStore } from "../stores";
import { IoSend } from "react-icons/io5";
import { PiUser } from "react-icons/pi";
import { PiRobot } from "react-icons/pi";

function CustomizedInputBase() {
  const sendChatMessageAsync = useChatStore(
    (state) => state.sendChatMessageAsync
  );
  const pendingResponse = useChatStore((state) => state.pendingResponse);
  const initChatWebSocket = useChatStore((state) => state.initChatWebSocket);
  const currWebSocket = useChatStore((state) => state.currWebSocket);
  const [message, setMessage] = useState("");

  useEffect(() => {
    initChatWebSocket();
    return () => {
      try {
        currWebSocket.close();
      } catch (err) {
        // log
      }
    };
  }, []);

  const clickHandler = async (e) => {
    if (message == 0) return;
    setMessage("");
    sendChatMessageAsync(message);
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //   }
  // };

  return (
    <div className="h-full flex p-1 items-center mt-2">
      <textarea
        className="w-full bg-white p-2 ml-1 rounded-lg whitespace-pre-wrap overflow-hidden"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onInput={(event) => {
          event.target.style.height = "auto";
          event.target.style.height = event.target.scrollHeight + "px";
        }}
        onKeyDown={(event) => {
          // handleKeyDown
          if (event.metaKey && event.key === "Enter") {
            event.preventDefault(); // Prevent the default action of inserting a newline.

            // Reset the height of the textarea and clear the value
            event.target.style.height = "auto";
            event.target.value = "";

            // Trigger the send message handler
            clickHandler(event);
          }
        }}
        value={message}
        placeholder="Send message"
        disabled={pendingResponse}
        autoFocus
        rows={1}
        style={{ height: "auto", maxHeight: "50vh", overflowY: "auto" }} // Start with auto height and hidden overflow
      />
      <button
        id="send_message"
        disabled={pendingResponse}
        onClick={clickHandler}
        className="p-2"
        type="button"
        aria-label="send"
      >
        {pendingResponse ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4,12a8,8 0 1 1 16,0 8,8 0 1 1 -16,0"
              ></path>
            </svg>
            ...
          </div>
        ) : (
          <IoSend size={25} />
        )}
      </button>
    </div>
  );
}

const ChatMessagePanel = () => {
  const chatMessages = useChatStore((state) => state.chatMessages);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null); // Ref for the chat messages container

  const scrollToBottom = () => {
    if (chatContainerRef.current && messagesEndRef.current) {
      chatContainerRef.current.scrollTop = messagesEndRef.current.offsetTop;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const renderChatMessages = () => {
    return chatMessages.map(({ id, message, msg_from }) => (
      <div key={id} className="flex items-start border-t border-gray-300 mt-4">
        <div className="flex justify-center items-center w-8 h-8 m-4">
          {msg_from === "user" ? <PiUser size={25} /> : <PiRobot size={25} />}
        </div>
        <div className="flex-1 mt-3 p-2">
          <p className="text-gray-600 whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-h-screen max-w-screen h-screen w-screen flex flex-col p-12 ">
      <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        {renderChatMessages()}
        {/* Invisible element at the end of messages */}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-300">
        <CustomizedInputBase />
      </div>
    </div>
  );
};

export default ChatMessagePanel;
