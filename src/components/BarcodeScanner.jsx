import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode"; 
import { FiCamera, FiSearch, FiCheck } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function BarcodeScanner({ onScan }) {
  const [barcodeInput, setBarcodeInput] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const inputRef = useRef(null);

  // Play scan sound
  const playScanSound = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3");
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  useEffect(() => {
    if (scanActive) {
      setError(null);
      const scanner = new Html5QrcodeScanner(
        "scanner-container",
        { 
          fps: 30, 
          qrbox: 350,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        },
        false
      );

      scannerRef.current = scanner;

      scanner.render(
        (text) => {
          playScanSound();
          setScanSuccess(true);
          onScan(text);
          setTimeout(() => {
            setScanSuccess(false);
            setScanActive(false);
          }, 1500);
        },
        (err) => {
          console.error("Scan error:", err);
          setError(err.message || "Scan failed");
        }
      );

      return () => {
        scanner.clear().catch(e => console.log("Scanner cleanup error:", e));
      };
    }
  }, [scanActive, onScan]);

  useEffect(() => {
    // Auto-focus input when scanner is inactive
    if (!scanActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [scanActive]);

  const handleManualSearch = () => {
    const trimmedBarcode = barcodeInput.trim();
    if (trimmedBarcode) {
      // Basic barcode validation (8-13 digits)
      if (/^\d{8,13}$/.test(trimmedBarcode)) {
        onScan(trimmedBarcode);
        setBarcodeInput("");
      } else {
        setError("Invalid barcode format (8-13 digits required)");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Scanner Status */}
      {scanSuccess && (
        <div className="flex items-center gap-2 p-2 bg-green-100 text-green-800 rounded-md">
          <FiCheck className="text-green-500" />
          <span>Scan successful!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-2 bg-red-100 text-red-800 rounded-md">
          <IoClose className="text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Camera Scanner */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setScanActive(!scanActive)}
          className={`flex items-center justify-center gap-2 p-2 rounded-md transition-all ${
            scanActive 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <FiCamera size={18} />
          {scanActive ? "Stop Scanner" : "Start Scanner"}
        </button>
        
        {scanActive && (
          <div className="relative aspect-video bg-gray-200 rounded-md overflow-hidden">
            <div id="scanner-container" className="w-full h-full" />
          </div>
        )}
      </div>

      {/* Manual Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter 8-13 digit barcode"
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={barcodeInput}
          onChange={(e) => {
            setBarcodeInput(e.target.value);
            setError(null);
          }}
          onKeyPress={(e) => e.key === "Enter" && handleManualSearch()}
          pattern="\d{8,13}"
          inputMode="numeric"
        />
        <button
          onClick={handleManualSearch}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors"
          disabled={!barcodeInput.trim()}
        >
          <FiSearch size={18} />
        </button>
      </div>
    </div>
  );
}