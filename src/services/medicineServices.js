export const getMedicineDetails = async (barcode) => {
    // Dummy static data
    const dummyDB = {
      "123456": { name: "Paracetamol", expiry: "12/2025", uses: "Fever, Pain relief" },
      "654321": { name: "Amoxicillin", expiry: "06/2024", uses: "Bacterial infections" },
    };
  
    return dummyDB[barcode] || { name: "Unknown", expiry: "-", uses: "No data found" };
  };
  