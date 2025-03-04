import { useState } from "react";
import { Menu, Search } from "lucide-react";

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Rephrase 'This is an AI chatbot generated for better communication and simpler workflows'", sender: "user" },
    { id: 2, text: "This AI chatbot has been developed to optimize communication and simplify work processes, ultimately leading to smoother operations.", sender: "bot" },
    { id: 3, text: "Thank you :)", sender: "user" },
    { id: 4, text: "Welcome, any other questions", sender: "bot" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add the user's message.
    const userMessage = { id: messages.length + 1, text: newMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Create a temporary loading message.
    const loadingMessageId = messages.length + 2;
    const loadingMessage = { id: loadingMessageId, text: "Generating...", sender: "bot", isLoading: true };
    setMessages((prev) => [...prev, loadingMessage]);

    // Simulate AI response after a delay.
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? { id: loadingMessageId, text: "Hi, I'm RickAI, how can I assist you?", sender: "bot" }
            : msg
        )
      );
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-[#0A0C19] text-white p-4 flex flex-col">
        <Menu size={24} className="mb-4" />
        <nav className="flex-1">
          <ul>
            <li className="p-2 hover:bg-gray-700 rounded bg-[#282934] border-black-300">New Chat</li>
            <br />
            <li className="p-2 hover:bg-gray-700 rounded font-bold">Recent Chats</li>
            <li className="p-2 hover:bg-gray-700 rounded">Rephrase text...</li>
            <li className="p-2 hover:bg-gray-700 rounded">Fix this code...</li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          Welcome back, <strong>Fred</strong>
        </div>
      </aside>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col p-4">
        {/* Top Bar */}
        <div className="flex justify-between p-2 border-b border-gray-300">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <Search size={20} className="text-black opacity-70" />
            <input type="text" placeholder="Search" className="border p-1 rounded border-black text-black" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-2 border-t border-black-300 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a new message here"
            className="flex-1 p-2 border rounded text-black opacity-70"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="p-2 bg-blue-500 text-white rounded" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
