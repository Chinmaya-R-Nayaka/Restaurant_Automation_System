import { useState } from "react";

const AddMenuItemModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    itemCode: "", itemName: "", category: "", price: "", isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd({...formData, price: Number(formData.price)});
  };

  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="itemCode" placeholder="Item Code" value={formData.itemCode}
            onChange={handleChange} className="w-full border p-2 rounded" required/>

          <input name="itemName" placeholder="Item Name" value={formData.itemName}
            onChange={handleChange} className="w-full border p-2 rounded" required/>

          <input name="category" placeholder="Category" value={formData.category}
            onChange={handleChange} className="w-full border p-2 rounded" required/>

          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange}
            className="w-full border p-2 rounded" min="0" required/>

          <label className="flex gap-2 items-center">
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}/>
            Available
          </label>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">Add Item</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMenuItemModal;