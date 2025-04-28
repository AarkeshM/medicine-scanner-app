import { useState } from "react";
import BarcodeScanner from "./components/BarcodeScanner";
import MedicineDetails from "./components/MedicineDetails";
import Chatbot from "./components/Chatbot";
import { FiMessageSquare, FiX } from "react-icons/fi";

export default function App() {
  const [medicine, setMedicine] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  // Mock API response (Replace with real API)
  const fetchMedicineDetails = (barcode) => {
    const mockData = {
      
      "8901234235660": {
        name: "Tums",
        description: "Antacid for heartburn and indigestion.",
        dosage: "1 tablet every 4-6 hours. Max 8 tablets/day.",
        manufacturer: "CureWell Biotech Inc.",
        expiry: "2026-01-07",
      },
      "8901234582568": {
        name: "Maalox",
        description: "Antacid for heartburn and indigestion.",
        dosage: "500 mg twice a day after meals.",
        manufacturer: "CureWell Biotech Inc.",
        expiry: "2027-01-12", 
      },
      "8901234361213": {
        name: "Visine Cold & Flu",
        description: "Relieves symptoms of cold and flu.",
        dosage: "2 drops in each eye twice daily.",
        manufacturer: "LifePlus Pharma Co.",
        expiry: "2026-08-07",

      }
      // Add more medicines 
    };
    
    const foundMedicine = mockData[barcode];
    if (foundMedicine) {
      setMedicine({
        name: foundMedicine.name,
        description:foundMedicine.description,
        dosage:foundMedicine.dosage,
        manufacturer: foundMedicine.manufacturer,
        expiry: foundMedicine.expiry,
      });
    } else {
      setMedicine({ error: "Medicine not found!" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Medicine Scanner</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Scanner Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Scan Barcode</h2>
            <BarcodeScanner onScan={fetchMedicineDetails} />
          </div>

          {/* Medicine Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Medicine Details</h2>
            {medicine ? (
              <MedicineDetails data={medicine} />
            ) : (
              <p className="text-gray-500">Scan a barcode to see details.</p>
            )}
          </div>
        </div>
      </main>

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {showChatbot ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          <Chatbot />
        </div>
      )}
    </div>
  );
}