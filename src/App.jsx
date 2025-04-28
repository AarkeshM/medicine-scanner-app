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
        "name": "Tums",
        "description": "Antacid for heartburn and indigestion.",
        "dosage": "1 tablet every 4-6 hours. Max 8 tablets/day.",
        "manufacturer": "CureWell Biotech Inc.",
        "expiry": "2026-01-07"
      },
      "8901234582568": {
        "name": "Maalox",
        "description": "Antacid for heartburn and indigestion.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "CureWell Biotech Inc.",
        "expiry": "2027-01-12"
      },
      "8901234361213": {
        "name": "Visine Cold & Flu",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "LifePlus Pharma Co.",
        "expiry": "2026-08-07"
      },
      "8901234601429": {
        "name": "Lisinopril",
        "description": "Controls blood pressure levels.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "WellCare Remedies Ltd.",
        "expiry": "2026-11-02"
      },
      "8901234326531": {
        "name": "Fluconazole",
        "description": "Treats fungal infections.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "expiry": "2025-06-29"
      },
      "8901234277906": {
        "name": "Ibuprofen Gel",
        "description": "Used for relief of mild to moderate pain and fever.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "expiry": "2025-12-03"
      },
      "8901234456881": {
        "name": "Albuterol",
        "description": "Bronchodilator for asthma.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "expiry": "2026-11-21"
      },
      "8901234494763": {
        "name": "Amoxicillin",
        "description": "Effective against bacterial infections.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "LifePlus Pharma Co.",
        "expiry": "2027-10-03"
      },
      "8901234332454": {
        "name": "Metformin",
        "description": "Used for managing diabetes.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "expiry": "2026-10-11"
      },
      "8901234735938": {
        "name": "Ciprofloxacin",
        "description": "Effective against bacterial infections.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "CureWell Biotech Inc.",
        "expiry": "2027-05-22"
      },
      "8901234151632": {
        "name": "Tobramycin Inhaler",
        "description": "Effective against bacterial infections.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2024-12-30",
        "expiry": "2026-12-30"
      },
      "8901234387026": {
        "name": "Vicks Cold Cream",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-12-12",
        "expiry": "2027-12-12"
      },
      "8901234440332": {
        "name": "Nystatin Syrup",
        "description": "Treats fungal infections.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-03-29",
        "expiry": "2027-03-29"
      },
      "8901234853585": {
        "name": "Fluticasone Cream",
        "description": "Bronchodilator for asthma.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-12-04",
        "expiry": "2027-12-04"
      },
      "8901234140726": {
        "name": "Losartan",
        "description": "Controls blood pressure levels.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-06-02",
        "expiry": "2027-06-02"
      },
      "8901234196659": {
        "name": "Azithromycin",
        "description": "Effective against bacterial infections.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-11-03",
        "expiry": "2025-11-02"
      },
      "8901234746234": {
        "name": "Hydrochlorothiazide",
        "description": "Controls blood pressure levels.",
        "dosage": "200 mg once a day.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-05-09",
        "expiry": "2026-05-09"
      },
      "8901234262292": {
        "name": "Benadryl Syrup",
        "description": "Antihistamine for allergy relief.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2024-06-25",
        "expiry": "2026-06-25"
      },
      "8901234594064": {
        "name": "Robitussin",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-09-04",
        "expiry": "2025-09-03"
      },
      "8901234454737": {
        "name": "Claritin",
        "description": "Antihistamine for allergy relief.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-11-08",
        "expiry": "2027-11-08"
      },
      "8901234123140": {
        "name": "Zyrtec",
        "description": "Antihistamine for allergy relief.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2023-05-09",
        "expiry": "2025-05-08"
      },
      "8901234659813": {
        "name": "Tylenol Cream",
        "description": "Used for relief of mild to moderate pain and fever.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-08-05",
        "expiry": "2027-08-05"
      },
      "8901234521003": {
        "name": "Doxycycline",
        "description": "Effective against bacterial infections.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-01-16",
        "expiry": "2026-01-15"
      },
      "8901234963738": {
        "name": "Cromolyn Inhaler",
        "description": "Antihistamine for allergy relief.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-10-19",
        "expiry": "2026-10-19"
      },
      "8901234878544": {
        "name": "Ketoconazole",
        "description": "Treats fungal infections.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-03-07",
        "expiry": "2025-03-06"
      },
      "8901234605249": {
        "name": "DayQuil",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-11-16",
        "expiry": "2026-11-16"
      },
      "8901234822028": {
        "name": "Cortizone-10",
        "description": "Antihistamine for allergy relief.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2023-09-28",
        "expiry": "2025-09-27"
      },
      "8901234313012": {
        "name": "Atenolol",
        "description": "Controls blood pressure levels.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2025-01-21",
        "expiry": "2027-01-21"
      },
      "8901234822087": {
        "name": "Theraflu Cream",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2024-04-19",
        "expiry": "2026-04-19"
      },
      "8901234391749": {
        "name": "Carvedilol",
        "description": "Controls blood pressure levels.",
        "dosage": "200 mg once a day.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-08-04",
        "expiry": "2025-08-03"
      },
      "8901234280080": {
        "name": "Coldcalm",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-12-13",
        "expiry": "2025-12-12"
      },
      "8901234945598": {
        "name": "Salmeterol",
        "description": "Bronchodilator for asthma.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2025-03-15",
        "expiry": "2027-03-15"
      },
      "8901234810361": {
        "name": "Zaditor",
        "description": "Antihistamine for allergy relief.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-08-24",
        "expiry": "2027-08-24"
      },
      "8901234425531": {
        "name": "Enalapril",
        "description": "Controls blood pressure levels.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-05-30",
        "expiry": "2026-05-30"
      },
      "8901234829199": {
        "name": "Phenylephrine",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "200 mg once a day.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-11-16",
        "expiry": "2026-11-16"
      },
      "8901234762103": {
        "name": "Natamycin Drops",
        "description": "Treats fungal infections.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2024-11-10",
        "expiry": "2026-11-10"
      },
      "8901234348310": {
        "name": "Hydrocortisone Cream",
        "description": "Reduces inflammation and swelling.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-12-06",
        "expiry": "2027-12-06"
      },
      "8901234102484": {
        "name": "Mucinex",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-12-30",
        "expiry": "2026-12-30"
      },
      "8901234904780": {
        "name": "Allegra",
        "description": "Antihistamine for allergy relief.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2024-09-05",
        "expiry": "2026-09-05"
      },
      "8901234175360": {
        "name": "Levofloxacin",
        "description": "Effective against bacterial infections.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-09-24",
        "expiry": "2025-09-23"
      },
      "8901234288533": {
        "name": "Econazole Drops",
        "description": "Treats fungal infections.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2024-06-06",
        "expiry": "2026-06-06"
      },
      "8901234846800": {
        "name": "Sudafed",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-10-07",
        "expiry": "2026-10-07"
      },
      "8901234969245": {
        "name": "Januvia Cream",
        "description": "Used for managing diabetes.",
        "dosage": "Apply twice daily to affected area.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-11-26",
        "expiry": "2025-11-25"
      },
      "8901234942856": {
        "name": "Gaviscon Inhaler",
        "description": "Antacid for heartburn and indigestion.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-12-15",
        "expiry": "2026-12-15"
      },
      "8901234592251": {
        "name": "Xyzal Syrup",
        "description": "Antihistamine for allergy relief.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2023-03-03",
        "expiry": "2025-03-02"
      },
      "8901234254743": {
        "name": "Glipizide",
        "description": "Used for managing diabetes.",
        "dosage": "200 mg once a day.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-03-16",
        "expiry": "2026-03-16"
      },
      "8901234730587": {
        "name": "Griseofulvin",
        "description": "Treats fungal infections.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2024-01-05",
        "expiry": "2026-01-04"
      },
      "8901234266792": {
        "name": "Prednisolone Syrup",
        "description": "Reduces inflammation and swelling.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2025-09-05",
        "expiry": "2027-09-05"
      },
      "8901234272394": {
        "name": "Terbinafine",
        "description": "Treats fungal infections.",
        "dosage": "200 mg once a day.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2023-10-28",
        "expiry": "2025-10-27"
      },
      "8901234615640": {
        "name": "NyQuil",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2024-08-07",
        "expiry": "2026-08-07"
      },
      "8901234556922": {
        "name": "Advil Syrup",
        "description": "Used for relief of mild to moderate pain and fever.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2023-05-08",
        "expiry": "2025-05-07"
      },
      "8901234454019": {
        "name": "Phenergan Eye Drops",
        "description": "Bronchodilator for asthma.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-11-08",
        "expiry": "2025-11-07"
      },
      "8901234784948": {
        "name": "Chlorpheniramine Syrup",
        "description": "Antihistamine for allergy relief.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-09-26",
        "expiry": "2026-09-26"
      },
      "8901234641953": {
        "name": "Coldzyme Capsule",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-02-12",
        "expiry": "2027-02-12"
      },
      "8901234157233": {
        "name": "Fexofenadine Capsule",
        "description": "Antihistamine for allergy relief.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2024-04-25",
        "expiry": "2026-04-25"
      },
      "8901234687422": {
        "name": "Clotrimazole Tablet",
        "description": "Treats fungal infections.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2023-08-11",
        "expiry": "2025-08-10"
      },
      "8901234683304": {
        "name": "Olopatadine Eye Drops",
        "description": "Bronchodilator for asthma.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-08-26",
        "expiry": "2027-08-26"
      },
      "8901234772103": {
        "name": "Diclofenac Tablet",
        "description": "Reduces inflammation and swelling.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-12-31",
        "expiry": "2027-12-31"
      },
      "8901234652163": {
        "name": "Itraconazole",
        "description": "Treats fungal infections.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-03-30",
        "expiry": "2027-03-30"
      },
      "8901234942413": {
        "name": "Cetirizine Syrup",
        "description": "Antihistamine for allergy relief.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2025-08-05",
        "expiry": "2027-08-05"
      },
      "8901234351411": {
        "name": "Pioglitazone",
        "description": "Used for managing diabetes.",
        "dosage": "200 mg once a day.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-09-08",
        "expiry": "2027-09-08"
      },
      "8901234262351": {
        "name": "Nasoclear Tablet",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2025-12-06",
        "expiry": "2027-12-06"
      },
      "8901234999852": {
        "name": "Loratadine Tablet",
        "description": "Antihistamine for allergy relief.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2023-09-10",
        "expiry": "2025-09-09"
      },
      "8901234658636": {
        "name": "Methylprednisolone Syrup",
        "description": "Reduces inflammation and swelling.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-01-24",
        "expiry": "2027-01-24"
      },
      "8901234564574": {
        "name": "Famotidine",
        "description": "Antihistamine for allergy relief.",
        "dosage": "200 mg once a day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2024-02-25",
        "expiry": "2026-02-24"
      },
      "8901234258076": {
        "name": "Glyburide",
        "description": "Used for managing diabetes.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-12-22",
        "expiry": "2027-12-22"
      },
      "8901234601378": {
        "name": "Formoterol Inhaler",
        "description": "Used for managing diabetes.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2024-10-16",
        "expiry": "2026-10-16"
      },
      "8901234326032": {
        "name": "Oxymetazoline Inhaler",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-06-11",
        "expiry": "2027-06-11"
      },
      "8901234819351": {
        "name": "Emedastine Eye Drops",
        "description": "Antihistamine for allergy relief.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-06-07",
        "expiry": "2027-06-07"
      },
      "8901234922355": {
        "name": "Cephalexin",
        "description": "Effective against bacterial infections.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-12-16",
        "expiry": "2025-12-15"
      },
      "8901234476647": {
        "name": "Theophylline Tablet",
        "description": "Used for managing diabetes.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-04-27",
        "expiry": "2027-04-27"
      },
      "8901234293814": {
        "name": "Miconazole",
        "description": "Antacid for heartburn and indigestion.",
        "dosage": "10 ml syrup every 8 hours.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-07-26",
        "expiry": "2027-07-26"
      },
      "8901234815267": {
        "name": "Proventil Tablet",
        "description": "Bronchodilator for asthma.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-05-19",
        "expiry": "2027-05-19"
      },
      "8901234556016": {
        "name": "Timolol Eye Drops",
        "description": "Controls blood pressure levels.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-02-01",
        "expiry": "2025-01-31"
      },
      "8901234560333": {
        "name": "Spironolactone Syrup",
        "description": "Controls blood pressure levels.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-01-23",
        "expiry": "2026-01-22"
      },
      "8901234182962": {
        "name": "Montelukast",
        "description": "Bronchodilator for asthma.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2024-06-18",
        "expiry": "2026-06-18"
      },
      "8901234918844": {
        "name": "Voriconazole",
        "description": "Treats fungal infections.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2023-03-18",
        "expiry": "2025-03-17"
      },
      "8901234183991": {
        "name": "Ramipril",
        "description": "Controls blood pressure levels.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-01-13",
        "expiry": "2027-01-13"
      },
      "8901234914414": {
        "name": "Cefixime Syrup",
        "description": "Effective against bacterial infections.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2025-07-06",
        "expiry": "2027-07-06"
      },
      "8901234624525": {
        "name": "Coldex Capsule",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "Take 1 capsule daily with water.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-06-11",
        "expiry": "2027-06-11"
      },
      "8901234571914": {
        "name": "Aminophylline Tablet",
        "description": "Bronchodilator for asthma.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-07-13",
        "expiry": "2026-07-13"
      },
      "8901234198057": {
        "name": "Butenafine",
        "description": "Treats fungal infections.",
        "dosage": "200 mg once a day.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2023-02-10",
        "expiry": "2025-02-09"
      },
      "8901234503452": {
        "name": "Azelastine Inhaler",
        "description": "Antihistamine for allergy relief.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2023-12-12",
        "expiry": "2025-12-11"
      },
      "8901234334604": {
        "name": "Ketorolac Tablet",
        "description": "Treats fungal infections.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "HealthGen Labs Pvt. Ltd.",
        "manufacturing_date": "2024-07-08",
        "expiry": "2026-07-08"
      },
      "8901234585734": {
        "name": "Nebivolol Inhaler",
        "description": "Controls blood pressure levels.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-05-10",
        "expiry": "2027-05-10"
      },
      "8901234825826": {
        "name": "Naproxen",
        "description": "Used for relief of mild to moderate pain and fever.",
        "dosage": "200 mg once a day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2023-04-25",
        "expiry": "2025-04-24"
      },
      "8901234194592": {
        "name": "Triamcinolone Inhaler",
        "description": "Reduces inflammation and swelling.",
        "dosage": "1 inhalation every 6 hours as needed.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2025-08-04",
        "expiry": "2027-08-04"
      },
      "8901234155611": {
        "name": "Verapamil",
        "description": "Controls blood pressure levels.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-12-07",
        "expiry": "2025-12-06"
      },
      "8901234863608": {
        "name": "Dextromethorphan Syrup",
        "description": "Relieves symptoms of cold and flu.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-08-15",
        "expiry": "2027-08-15"
      },
      "8901234677787": {
        "name": "Amphotericin B",
        "description": "Treats fungal infections.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-02-19",
        "expiry": "2025-02-18"
      },
      "8901234661468": {
        "name": "Celecoxib",
        "description": "Used for relief of mild to moderate pain and fever.",
        "dosage": "500 mg twice a day after meals.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2025-09-13",
        "expiry": "2027-09-13"
      },
      "8901234317641": {
        "name": "Epinephrine Eye Drops",
        "description": "Bronchodilator for asthma.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-06-02",
        "expiry": "2026-06-02"
      },
      "8901234156912": {
        "name": "Doxazosin",
        "description": "Effective against bacterial infections.",
        "dosage": "200 mg once a day.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-02-21",
        "expiry": "2027-02-21"
      },
      "8901234600826": {
        "name": "Betamethasone Tablet",
        "description": "Reduces inflammation and swelling.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "LifePlus Pharma Co.",
        "manufacturing_date": "2023-02-19",
        "expiry": "2025-02-18"
      },
      "8901234843432": {
        "name": "Ranitidine",
        "description": "Antacid for heartburn and indigestion.",
        "dosage": "200 mg once a day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-02-18",
        "expiry": "2027-02-18"
      },
      "8901234458295": {
        "name": "Meloxicam",
        "description": "Reduces inflammation and swelling.",
        "dosage": "200 mg once a day.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2023-09-22",
        "expiry": "2025-09-21"
      },
      "8901234867028": {
        "name": "Dexamethasone Tablet",
        "description": "Reduces inflammation and swelling.",
        "dosage": "1 tablet daily in the morning.",
        "manufacturer": "Medicare Pharmaceuticals Ltd.",
        "manufacturing_date": "2025-06-16",
        "expiry": "2027-06-16"
      },
      "8901234511914": {
        "name": "Repaglinide",
        "description": "Used for managing diabetes.",
        "dosage": "1 tablet every 4–6 hours. Max 8 tablets/day.",
        "manufacturer": "WellCare Remedies Ltd.",
        "manufacturing_date": "2024-04-30",
        "expiry": "2026-04-30"
      },
      "8901234757648": {
        "name": "Miglitol Syrup",
        "description": "Used for managing diabetes.",
        "dosage": "5 ml suspension every 12 hours.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2023-07-04",
        "expiry": "2025-07-03"
      },
      "8901234402363": {
        "name": "Budesonide Eye Drops",
        "description": "Bronchodilator for asthma.",
        "dosage": "2 drops in each eye twice daily.",
        "manufacturer": "CureWell Biotech Inc.",
        "manufacturing_date": "2025-07-28",
        "expiry": "2027-07-28"
      },
      "456789012345": {
        "name": "Aspirin",
        "description": "Anti-inflammatory and pain reliever",
        "dosage": "325mg",
        "manufacturer": "Pain Relief Inc.",
        "expiry": "2027-04-25"
      },
      "567890123456": {
        "name": "Paracetamol Extra Strength",
        "description": "Pain reliever and fever reducer",
        "dosage": "1000mg",
        "manufacturer": "Generic Pharmaceuticals",
        "expiry": "2027-05-05"
      },
      "678901234567": {
        "name": "Ibuprofen Max",
        "description": "Nonsteroidal anti-inflammatory drug",
        "dosage": "400mg",
        "manufacturer": "Brand Pharmaceuticals",
        "expiry": "2027-06-15"
      },
      "789012345678": {
        "name": "Amoxicillin Plus",
        "description": "Antibiotic",
        "dosage": "1000mg",
        "manufacturer": "Antibiotic Labs",
        "expiry": "2027-07-20"
      },
    };

    const foundMedicine = mockData[barcode];
    if (foundMedicine) {
      setMedicine({
        name: foundMedicine.name,
        description: foundMedicine.description,
        dosage: foundMedicine.dosage,
        manufacturer: foundMedicine.manufacturer,
        expiry: foundMedicine.expiry,
      });
    } else {
      setMedicine({ error: "Medicine not found!" });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('\Gal-Picsart-AiImageEnhancer.jpg')` }}>
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