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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[18px] border border-[#f4ebdc]/10 bg-[#241b16] p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
        <h2 className="font-['Fraunces',Georgia,serif] text-2xl font-medium text-[#f4ebdc]">Edit Menu Item</h2>
        <p className="text-[0.92rem] text-[#8b7e70] mt-1 mb-6">Update the details for this item.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Item Code</span>
            <input name="itemCode" value={formData.itemCode} onChange={handleChange} className="w-full rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"/>
          </label>

          <label className="block">
            <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Item Name</span>
            <input name="itemName" value={formData.itemName} onChange={handleChange} className="w-full rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"/>
          </label>

          <label className="block">
            <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Category</span>
            <input name="category" value={formData.category} onChange={handleChange} className="w-full rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"/>
          </label>

          <label className="block">
            <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Price (₹)</span>
            <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"/>
          </label>

          <label className="flex gap-2.5 items-center text-[0.92rem] text-[#d9cdb9]">
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} className="h-4 w-4 accent-[#c6a15b]"/>
            Available
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-[9px] border border-[#f4ebdc]/20 px-5 py-2.5 text-[0.95rem] text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]">Cancel</button>
            <button type="submit" className="rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-5 py-2.5 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]">Save Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditMenuItemModal;