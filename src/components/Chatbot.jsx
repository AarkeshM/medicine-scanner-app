import { useState } from "react";
import { FiSend } from "react-icons/fi";

// Mock medicine database with stock quantities
const medicineDatabase = {
  "Synthroid 112mcg": { stock: 18, barcode: "0074929619" },
  "Amoxicillin 250g": { stock: 35, barcode: "0093-3107-05" },
  "Paracetamol 500mg": { stock: 42, barcode: "123456789012" },
  "Ibuprofen 200mg": { stock: 27, barcode: "234567890123" },
  "Amoxicillin 500mg": { stock: 31, barcode: "345678901234" },
  "Aspirin 325mg": { stock: 56, barcode: "456789012345" },
  "Paracetamol Extra Strength 1000mg": { stock: 23, barcode: "567890123456" },
  "Ibuprofen Max 400mg": { stock: 19, barcode: "678901234567" },
  "Amoxicillin Plus 1000mg": { stock: 14, barcode: "789012345678" },
  "Aspirin Max 500mg": { stock: 38, barcode: "890123456789" },
  "Paracetamol Junior 125mg": { stock: 47, barcode: "901234567890" },
  "Ibuprofen Junior 100mg": { stock: 29, barcode: "012345678901" },
  "Tums tablet": { stock: 62, barcode: "8901234235660" },
  "Maalox 500mg": { stock: 41, barcode: "8901234582568" },
  "Visine Cold & Flu drops": { stock: 33, barcode: "8901234361213" },
  "Lisinopril tablet": { stock: 25, barcode: "8901234601429" },
  "Fluconazole inhalation": { stock: 17, barcode: "8901234326531" },
  "Tums tablet": { stock: 28, barcode: "5012345678901" },
  "Maalox 500mg": { stock: 35, barcode: "9780123456789" },
  "Visine Cold & Flu drops": { stock: 42, barcode: "6901234567890" },
  "Lisinopril tablet": { stock: 19, barcode: "8901234567891" },
  "Fluconazole inhalation": { stock: 23, barcode: "1234567890123" },
  "Ibuprofen Gel": { stock: 31, barcode: "2345678901234" },
  "Albuterol 500mg": { stock: 27, barcode: "3456789012345" },
  "Amoxicillin capsule": { stock: 38, barcode: "4567890123456" },
  "Metformin 500mg": { stock: 45, barcode: "5678901234567" },
  "Ciprofloxacin capsule": { stock: 22, barcode: "6789012345678" },
  "Tobramycin Inhaler": { stock: 17, barcode: "7890123456789" },
  "Vicks Cold Cream": { stock: 29, barcode: "8901234567890" },
  "Nystatin Syrup 10ml": { stock: 33, barcode: "9012345678901" },
  "Fluticasone Cream": { stock: 26, barcode: "0123456789012" },
  "Losartan tablet": { stock: 41, barcode: "1234567890123" },
  "Azithromycin tablet": { stock: 18, barcode: "2345678901234" },
  "Hydrochlorothiazide 200mg": { stock: 24, barcode: "3456789012345" },
  "Benadryl Syrup 10ml": { stock: 36, barcode: "4567890123456" },
  "Robitussin 5ml": { stock: 21, barcode: "5678901234567" },
  "Claritin tablet": { stock: 39, barcode: "6789012345678" },
  "Zyrtec 500mg": { stock: 30, barcode: "7890123456789" },
  "Tylenol Cream": { stock: 25, barcode: "8901234567890" },
  "Doxycycline tablet": { stock: 43, barcode: "9012345678901" },
  "Cromolyn Inhaler": { stock: 16, barcode: "0123456789012" },
  "Ketoconazole tablet": { stock: 34, barcode: "1234567890123" },
  "DayQuil 5ml": { stock: 28, barcode: "2345678901234" },
  "Cortizone-10": { stock: 37, barcode: "3456789012345" },
  "Atenolol tablet": { stock: 22, barcode: "4567890123456" },
  "Theraflu Cream": { stock: 29, barcode: "5678901234567" },
  "Carvedilol 200mg": { stock: 31, barcode: "6789012345678" },
  "Coldcalm capsule": { stock: 18, barcode: "7890123456789" },
  "Salmeterol inhalation": { stock: 25, barcode: "8901234567890" },
  "Zaditor drops": { stock: 33, barcode: "9012345678901" },
  "Enalapril 5ml": { stock: 27, barcode: "0123456789012" },
  "Phenylephrine 200mg": { stock: 19, barcode: "1234567890123" },
  "Natamycin Drops": { stock: 21, barcode: "2345678901234" },
  "Hydrocortisone Cream": { stock: 38, barcode: "3456789012345" },
  "Mucinex 500mg": { stock: 42, barcode: "4567890123456" },
  "Allegra tablet": { stock: 29, barcode: "5678901234567" },
  "Levofloxacin capsule": { stock: 16, barcode: "6789012345678" },
  "Econazole Drops": { stock: 24, barcode: "7890123456789" },
  "Sudafed tablet": { stock: 35, barcode: "8901234567890" },
  "Januvia Cream": { stock: 27, barcode: "9012345678901" },
  "Gaviscon Inhaler": { stock: 19, barcode: "0123456789012" },
  "Xyzal Syrup 5ml": { stock: 31, barcode: "1234567890123" },
  "Glipizide 200mg": { stock: 22, barcode: "2345678901234" },
  "Griseofulvin 5ml": { stock: 18, barcode: "3456789012345" },
  "Prednisolone Syrup 5ml": { stock: 29, barcode: "4567890123456" },
  "Terbinafine 200mg": { stock: 33, barcode: "5678901234567" },
  "NyQuil tablet": { stock: 25, barcode: "6789012345678" },
  "Advil Syrup 10ml": { stock: 37, barcode: "7890123456789" },
  "Phenergan Eye Drops": { stock: 21, barcode: "8901234567890" },
  "Chlorpheniramine Syrup 5ml": { stock: 28, barcode: "9012345678901" },
  "Coldcalm Capsule": { stock: 19, barcode: "0123456789012" },
  "Fexofenadine Capsule": { stock: 31, barcode: "1234567890123" },
  "Clotrimazole Tablet": { stock: 24, barcode: "2345678901234" },
  "Olopatadine Eye Drops": { stock: 17, barcode: "3456789012345" },
  "Diclofenac Tablet 500mg": { stock: 35, barcode: "4567890123456" },
  "Itraconazole 500mg": { stock: 22, barcode: "5678901234567" },
  "Cetirizine Syrup 10ml": { stock: 29, barcode: "6789012345678" },
  "Pioglitazone 200mg": { stock: 18, barcode: "7890123456789" },
  "Nasoclear Tablet": { stock: 33, barcode: "8901234567890" },
  "Loratadine Tablet": { stock: 25, barcode: "9012345678901" },
  "Methylprednisolone Syrup 10ml": { stock: 37, barcode: "0123456789012" },
  "Famotidine 200mg": { stock: 21, barcode: "1234567890123" },
  "Glyburide tablet": { stock: 28, barcode: "2345678901234" },
  "Formoterol Inhaler": { stock: 19, barcode: "3456789012345" },
  "Oxymetazoline Inhaler": { stock: 31, barcode: "4567890123456" },
  "Emedastine Eye Drops": { stock: 24, barcode: "5678901234567" },
  "Cephalexin tablet": { stock: 17, barcode: "6789012345678" },
  "Theophylline Tablet": { stock: 35, barcode: "7890123456789" },
  "Miconazole 10ml": { stock: 22, barcode: "8901234567890" },
  "Proventil Tablet": { stock: 29, barcode: "9012345678901" },
  "Timolol Eye Drops": { stock: 18, barcode: "0123456789012" },
  "Spironolactone Syrup 5ml": { stock: 33, barcode: "1234567890123" },
  "Montelukast 500mg": { stock: 25, barcode: "2345678901234" },
  "Voriconazole tablet": { stock: 37, barcode: "3456789012345" },
  "Ramipril tablet": { stock: 21, barcode: "4567890123456" },
  "Cefixime Syrup 5ml": { stock: 28, barcode: "5678901234567" },
  "Coldex Capsule": { stock: 19, barcode: "6789012345678" },
  "Aminophylline Tablet": { stock: 31, barcode: "7890123456789" },
  "Butenafine 200mg": { stock: 24, barcode: "8901234567890" },
  "Azelastine Inhaler": { stock: 17, barcode: "9012345678901" },
  "Ketorolac Tablet 500mg": { stock: 35, barcode: "0123456789012" },
  "Nebivolol Inhaler": { stock: 22, barcode: "1234567890123" },
  "Naproxen 200mg": { stock: 29, barcode: "2345678901234" },
  "Triamcinolone Inhaler": { stock: 18, barcode: "3456789012345" },
  "Verapamil tablet": { stock: 33, barcode: "4567890123456" },
  "Dextromethorphan Syrup 5ml": { stock: 25, barcode: "5678901234567" },
  "Amphotericin B tablet": { stock: 37, barcode: "6789012345678" },
  "Celecoxib 500mg": { stock: 21, barcode: "7890123456789" },
  "Epinephrine Eye Drops": { stock: 28, barcode: "8901234567890" },
  "Doxazosin 200mg": { stock: 19, barcode: "9012345678901" },
  "Betamethasone Tablet": { stock: 31, barcode: "0123456789012" },
  "Ranitidine 200mg": { stock: 24, barcode: "1234567890123" },
  "Meloxicam 200mg": { stock: 17, barcode: "2345678901234" },
  "Dexamethasone Tablet": { stock: 35, barcode: "3456789012345" },
  "Repaglinide tablet": { stock: 22, barcode: "4567890123456" },
  "Miglitol Syrup 5ml": { stock: 29, barcode: "5678901234567" },
  "Budesonide Eye Drops": { stock: 18, barcode: "6789012345678" }


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
            className={`mb-2 p-2 rounded-md max-w-[80%] ${msg.sender === "user"
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