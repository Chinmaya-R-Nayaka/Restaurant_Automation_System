const OrderItemTable = ({ items, onRemove }) => {
    return(
        <div>
            <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Order Items</h2>

            {items.length === 0 ? (
                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-8 text-center text-[#8b7e70]">
                    No items added
                </div>
            ) : (
                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                <th className="py-3 px-4">Item Code</th>
                                <th className="py-3 px-4">Item Name</th>
                                <th className="py-3 px-4">Quantity</th>
                                <th className="py-3 px-4">Unit Price</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.itemCode} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                    <td className="py-3 px-4 text-[#f4ebdc]">{item.itemCode}</td>
                                    <td className="py-3 px-4 text-[#f4ebdc]">{item.itemName}</td>
                                    <td className="py-3 px-4 text-[#d9cdb9]">{item.quantity}</td>
                                    <td className="py-3 px-4 text-[#d9cdb9]">₹{item.unitPrice}</td>
                                    <td className="py-3 px-4 text-[#c6a15b]">
                                        ₹{item.unitPrice * item.quantity}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => onRemove(item.itemCode)}
                                            className="rounded-[9px] border border-[#a85c41]/40 px-3 py-1.5 text-sm text-[#d98b6f] transition duration-200 hover:bg-[#a85c41]/15 active:scale-[0.97]"
                                        >Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderItemTable;