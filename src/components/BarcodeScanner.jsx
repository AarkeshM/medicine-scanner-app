import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

export default function MedicineScanner() {
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async (barcode) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const product = data.items[0];
        setMedicineDetails({
          name: product.title,
          brand: product.brand,
          category: product.category,
        });
      } else {
        setError("No medicine found for this barcode!");
      }
    } catch (err) {
      setError("Failed to fetch data. Check internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Medicine Scanner</h1>
      
      <BarcodeScanner onScan={handleScan} />
      
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {medicineDetails && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold">{medicineDetails.name}</h3>
          <p>Brand: {medicineDetails.brand || "N/A"}</p>
          <p>Category: {medicineDetails.category || "N/A"}</p>
        </div>
      )}
    </div>
  );
}