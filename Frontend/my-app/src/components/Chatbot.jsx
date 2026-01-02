import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaComments } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm EduBot 🤖. Ask me about Visas, Loans, or Top Colleges.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // 2. Simulate AI Delay & Response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 800);
  };

  // --- THE "BRAIN" (Automated Logic) ---
  const getBotResponse = (question) => {
    const q = question.toLowerCase();
    
    if (q.includes("visa")) return "For Student Visas (F1/Tier-4), you need: 1. Acceptance Letter 2. Proof of Funds 3. Valid Passport. Check our Visa Tracker in the Dashboard!";
    if (q.includes("loan") || q.includes("emi")) return "We offer education loans up to 40 Lakhs with 8-10% interest. Use our EMI Calculator to plan.";
    if (q.includes("scholarship")) return "Top scholarships include Fulbright, Chevening, and Tata Trust. Visit the Scholarships page to apply.";
    if (q.includes("ielts") || q.includes("toefl")) return "IELTS score of 6.5+ is recommended for most UK/Canada universities. We have free prep material available.";
    if (q.includes("cs") || q.includes("computer")) return "Top CS colleges: MIT, Stanford, IIT Bombay. Check the 'College Finder' page.";
    if (q.includes("hello") || q.includes("hi")) return "Hello future achiever! How can I help you today?";
    
    return "That's a great question! For detailed counselling, please contact our human experts at support@eduglobal.com.";
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window animation-slide-up">
          <div className="chat-header">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <div className="bot-avatar"><FaRobot /></div>
              <div>
                <h4>EduBot AI</h4>
                <span className="online-dot">● Online</span>
              </div>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)} 
            />
            <button type="submit"><FaPaperPlane /></button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;