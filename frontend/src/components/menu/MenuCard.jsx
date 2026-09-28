const MenuCard = ({ item, onEdit, onDelete, onPriceUpdate }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{item.itemName}</h3>
          <p className="text-sm text-gray-500">Code: {item.itemCode}</p>
          <p className="text-sm text-gray-500">Category: {item.category}</p>
        </div>

        <span className={`px-2 py-1 text-xs rounded ${
            item.isAvailable? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >{item.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <p className="text-xl font-bold mt-4">₹{item.price?.$numberDecimal || item.price}</p>

      <div className="flex gap-2 mt-4">
        <button onClick={() => onEdit(item)} className="px-3 py-1 border rounded">Edit</button>
        <button onClick={() => onPriceUpdate(item)} className="px-3 py-1 border rounded">Update Price</button>
        <button onClick={() => onDelete(item._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
      </div>
    </div>
  );
};

export default MenuCard;