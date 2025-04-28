import { useState } from "react";
import { FiSend } from "react-icons/fi";

// Mock medicine database with stock quantities
const medicineDatabase = {
  "Paracetamol 500mg": { stock: 42, barcode: "123456789012" },
  "Ibuprofen 200mg": { stock: 0, barcode: "987654321098" },
  "Tums Antacid": { stock: 15, barcode: "8901234235660" },
  "Maalox": { stock: 7, barcode: "8901234582568" },
  "Visine Cold & Flu": { stock: 23, barcode: "8901234361213" }
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I can check medicine stock for you. Try asking 'Is Paracetamol in stock?' or 'Check Ibuprofen availability'", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");

  const checkStock = (medicineName) => {
    // Find the medicine (case insensitive)
    const medicineKey = Object.keys(medicineDatabase).find(key => 
      key.toLowerCase().includes(medicineName.toLowerCase())
    );

    if (medicineKey) {
      const medicine = medicineDatabase[medicineKey];
      return {
        text: `${medicineKey}: ${medicine.stock > 0 ? 
          `✅ Available (${medicine.stock} in stock)` : 
          '❌ Out of stock'}`,
        isStockInfo: true
      };
    }
    return {
      text: `I couldn't find "${medicineName}" in our database. Try another name or scan the barcode.`,
      isStockInfo: false
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputText, sender: "user" }]);
    setInputText("");

    // Process query after a short delay (simulating thinking time)
    setTimeout(() => {
      let botResponse = { text: "I can help with medicine information. Ask about stock availability!", isStockInfo: false };
      
      // Check if question is about stock
      if (/(stock|available|quantity|have|check)/i.test(inputText)) {
        const medicineQuery = inputText.replace(/(stock|available|quantity|is|do|you|have|check|\?)/gi, "").trim();
        botResponse = checkStock(medicineQuery);
      }

      setMessages(prev => [...prev, { 
        text: botResponse.text, 
        sender: "bot",
        isStock: botResponse.isStockInfo 
      }]);
    }, 800);
  };

  return (
    <div className="h-96 flex flex-col">
      <div className="p-3 bg-blue-600 text-white font-semibold rounded-t-lg">
        Medicine Stock Assistant
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded-md max-w-[80%] ${
              msg.sender === "user" 
                ? "bg-blue-100 ml-auto" 
                : `bg-gray-100 mr-auto ${msg.isStock ? 'border-l-4 border-blue-500' : ''}`
            }`}
          >
            {msg.text}
            {msg.isStock && (
              <div className="text-xs mt-1 text-gray-500">
                Barcode: {medicineDatabase[msg.text.split(':')[0]]?.barcode || 'N/A'}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          placeholder="Ask about medicine stock..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition"
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}