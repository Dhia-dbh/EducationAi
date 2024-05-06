import { useState } from "react";
import "./chat.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import runChat from "../../config/gemini.js";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function Chat() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessage(newMessages);
  };

  async function processMessage(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat
    const response = await runChat(
      chatMessages[chatMessages.length - 1].message
    );

    setMessages([
      ...chatMessages,
      {
        message: response.text(),
        direction: "incoming",
        sender: "ChatGPT",
      },
    ]);
    setIsTyping(false);
  }

  return (
    <div
      className="App"
      style={{
        position: "absolute",
        left: "650px",
        bottom: "150px",
        overflow: "hidden",
      }}
    >
      <div
        id="chat"
        style={{
          position: "relative",
          height: "600px",
          width: "700px",
        }}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? <TypingIndicator content="mehrez is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                //console.log(message)
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chat;
