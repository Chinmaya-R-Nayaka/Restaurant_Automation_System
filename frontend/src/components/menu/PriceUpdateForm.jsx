import { useState } from "react";

const PriceUpdateForm = ({ item, onClose, onUpdate }) => {
  const [price, setPrice] = useState(item.price?.$numberDecimal || item.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(item._id, {price: Number(price)});
  };

  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Update Price</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600">{item.itemName}</p>

          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded" min="0" required
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">Update</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PriceUpdateForm;