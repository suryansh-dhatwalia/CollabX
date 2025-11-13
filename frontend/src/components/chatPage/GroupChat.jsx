import React, { useState , useContext } from "react";
import { Plus, Send } from "lucide-react";
import Button from "../ui/button/button.jsx";
import Input from "../ui/input/input.jsx";



export default function GroupChat({ setIsModalOpen , projectName ,fullName }) {
    
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      text: "Hey! Are you here?",
      time: "13:53",
      isOwn: false,
    },
    {
      id: 2,
      author: "Sarah Chen",
      text: "Great work on the slides! Love it! Just one more thing...",
      time: "13:54",
      isOwn: false,
    },
    {
      id: 3,
      author: "Marcus Johnson",
      text: "Yeah...",
      time: "13:55",
      isOwn: false,
    },
    {
      id: 4,
      author: "You",
      text: "Thanks everyone! I'll make those adjustments",
      time: "13:56",
      isOwn: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          author: "You",
          text: inputValue,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="w-full sm:w-3/8 flex flex-col bg-black border-r border-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Group Chat
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
          <div>
            <p className="text-sm font-medium text-white">{fullName}</p>
            <p className="text-xs text-gray-400">{projectName}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xs">
              <p className="text-xs text-gray-400 mb-1">{msg.author}</p>
              <div
                className={`rounded-lg px-3 py-2 ${
                  msg.isOwn
                    ? "bg-blue-600 text-white ml-6"
                    : "bg-gray-900 text-gray-100 mr-6"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter Message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button className="h-8" size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}