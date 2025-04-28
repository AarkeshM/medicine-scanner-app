import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FiCamera, FiSearch } from "react-icons/fi";

export default function BarcodeScanner({ onScan }) {
  const [barcodeInput, setBarcodeInput] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scanActive) {
      const scanner = new Html5QrcodeScanner(
        "scanner-container",
        { fps: 30, qrbox: 350 },
        false
      );
      scannerRef.current = scanner;

      scanner.render(
        (text) => {
          onScan(text);
          setScanActive(false);
        },
        (err) => console.error("Scan error:", err)
      );

      return () => scanner.clear().catch(console.error);
    }
  }, [scanActive, onScan]);

  const handleManualSearch = () => {
    if (barcodeInput.trim()) {
      onScan(barcodeInput.trim());
      setBarcodeInput("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Camera Scanner */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setScanActive(!scanActive)}
          className={`flex items-center justify-center gap-2 p-2 rounded-md ${
            scanActive ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          <FiCamera size={18} />
          {scanActive ? "Stop Scanner" : "Start Scanner"}
        </button>
        {scanActive && (
          <div className="relative w-full h-full bg-gray-200 rounded-md overflow-hidden">
            <div id="scanner-container" className="w-full h-full" />
          </div>
        )}
      </div>

      {/* Manual Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter barcode manually"
          className="flex-1 p-2 border rounded-md"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleManualSearch()}
        />
        <button
          onClick={handleManualSearch}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          <FiSearch size={18} />
        </button>
      </div>
    </div>
  );
}