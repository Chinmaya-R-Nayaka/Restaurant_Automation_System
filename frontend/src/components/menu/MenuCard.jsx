const MenuCard = ({ item, onEdit, onDelete, onPriceUpdate }) => {
  return (
    <div className="flex flex-col rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.05] p-6 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c6a15b]/40 hover:bg-[#f4ebdc]/[0.07]">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="font-['Fraunces',Georgia,serif] text-lg font-medium text-[#f4ebdc] break-words">{item.itemName}</h3>
          <p className="text-sm text-[#8b7e70] mt-1">Code: {item.itemCode}</p>
          <p className="text-sm text-[#8b7e70]">Category: {item.category}</p>
        </div>

        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            item.isAvailable? "bg-[#7fae8c]/15 text-[#7fae8c]" : "bg-[#a85c41]/20 text-[#d98b6f]"}`}
        >{item.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <p className="font-['Fraunces',Georgia,serif] text-2xl text-[#c6a15b] mt-5">₹{item.price?.$numberDecimal || item.price}</p>

      <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#f4ebdc]/10">
        <button onClick={() => onEdit(item)} className="rounded-[9px] border border-[#f4ebdc]/20 px-3.5 py-1.5 text-sm text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]">Edit</button>
        <button onClick={() => onPriceUpdate(item)} className="rounded-[9px] border border-[#f4ebdc]/20 px-3.5 py-1.5 text-sm text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]">Update Price</button>
        <button onClick={() => onDelete(item._id)} className="rounded-[9px] border border-[#a85c41]/40 px-3.5 py-1.5 text-sm text-[#d98b6f] transition duration-200 hover:bg-[#a85c41]/15 active:scale-[0.97]">Delete</button>
      </div>
    </div>
  );
};

export default MenuCard;