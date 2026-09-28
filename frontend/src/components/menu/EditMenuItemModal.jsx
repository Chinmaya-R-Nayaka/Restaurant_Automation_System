import { useState } from "react";

const EditMenuItemModal = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    itemCode: item.itemCode,
    itemName: item.itemName,
    category: item.category,
    price: item.price?.$numberDecimal || item.price,
    isAvailable: item.isAvailable,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(item._id, {...formData, price: Number(formData.price)});
  };

  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="itemCode" value={formData.itemCode} onChange={handleChange} className="w-full border p-2 rounded"/>
          <input name="itemName" value={formData.itemName} onChange={handleChange} className="w-full border p-2 rounded"/>
          <input name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded"/>
          <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded"/>

          <label className="flex gap-2 items-center">
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}/>
            Available
          </label>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">Save Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditMenuItemModal;