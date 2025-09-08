import { useState, useRef, useEffect } from 'react';
import API from '../api';

export default function ChatBotAssistant({ role = 'student' }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi! I'm your assistant. How can I help you today?` },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  const onSend = async e => {
    e.preventDefault();
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await API.post('/ai/ask', { message: input, role });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-[300px] bg-white border rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={onSend} className="flex p-2 border-t">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me..."
          className="flex-grow border rounded p-2 mr-2"
        />
        <button type="submit" className="text-white px-3 rounded bg-gradient-to-r from-blue-800 to-purple-900">
          Send
        </button>
      </form>
    </div>
  );
}
