// src/components/Chatbot.jsx
import React, { useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  useEffect(() => {
    const dfMessenger = document.querySelector('df-messenger');

    // Example logic to clear chat when the user disconnects
    const handleUserDisconnect = () => {
      // Simulate clearing chat
      dfMessenger.innerHTML = '';
      dfMessenger.appendChild(
        document.createElement('df-messenger')
      );
      // Reinitialize the Dialogflow Messenger
      const script = document.createElement('script');
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.defer = true;
      document.body.appendChild(script);
    };

    window.addEventListener('beforeunload', handleUserDisconnect);

    return () => {
      window.removeEventListener('beforeunload', handleUserDisconnect);
    };
  }, []);

  return (
    <div className="chat-container">
      <df-messenger
        intent="WELCOME"
        chat-title="PortfolioBot"
        agent-id="fce8148c-aafb-46cf-ac27-9942366acd5c"
        language-code="en"
      >

      <div className="robot-icon"></div>
      </df-messenger>
      <script
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        defer
      ></script>
    </div>
  );
};

export default Chatbot;
