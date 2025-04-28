export default function MedicineDetails({ data }) {
  if (data.error) {
    return <p className="text-red-500">{data.error}</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold">{data.name}</h3>
      <p><span className="font-semibold">Description:</span> {data.description}</p>
      <p><span className="font-semibold">Dosage:</span> {data.dosage}</p>
      <p><span className="font-semibold">Manufacturer:</span> {data.manufacturer}</p>
      <p><span className="font-semibold">Expiry:</span> {data.expiry}</p>
    </div>
  );
}