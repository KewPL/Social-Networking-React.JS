import React from 'react';

const Chat = ({ messages, loggedInUserId }) => {
  return (
    <div className="chat-display">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.isUser ? 'user-message' : 'other-message'}`}
        >
          {message.isUser ? null : (
            <div className="chat-message-header">
              {message.name && <p>{message.name}</p>}
            </div>
          )}
          <div className="message-content">
            <div className={`message-text ${message.isUser ? 'user-text' : 'other-text'}`}>
              {message.message}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleString([], {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
