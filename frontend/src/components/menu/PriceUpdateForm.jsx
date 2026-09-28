import { useState } from "react";

const PriceUpdateForm = ({ item, onClose, onUpdate }) => {
  const [price, setPrice] = useState(item.price?.$numberDecimal || item.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(item._id, {price: Number(price)});
  };

  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-[18px] border border-[#f4ebdc]/10 bg-[#241b16] p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
        <h2 className="font-['Fraunces',Georgia,serif] text-2xl font-medium text-[#f4ebdc]">Update Price</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          <p className="text-[0.92rem] text-[#8b7e70] mb-5">{item.itemName}</p>

          <label className="block">
            <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">New price (₹)</span>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]" min="0" required
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-[9px] border border-[#f4ebdc]/20 px-5 py-2.5 text-[0.95rem] text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]">Cancel</button>
            <button type="submit" className="rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-5 py-2.5 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]">Update</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PriceUpdateForm;