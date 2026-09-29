
const BillPreview = ({ bill }) => {
    if(!bill){
        return null;
    }

    return(
        <div className="rounded-[16px] border border-[#c6a15b]/25 bg-[#f4ebdc]/[0.04] p-6">
            <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Bill Preview</h2>

            <div className="text-[0.92rem] text-[#d9cdb9] space-y-1 mb-5">
                <p><strong className="text-[#8b7e70] font-normal">Order ID:</strong> {bill.orderId}</p>

                <p><strong className="text-[#8b7e70] font-normal">Order Date:</strong>{' '}
                    {new Date(bill.orderDate).toLocaleString()}
                </p>

                <p><strong className="text-[#8b7e70] font-normal">Payment Mode:</strong> {bill.paymentMode}</p>
            </div>

            <div className="rounded-[12px] border border-[#f4ebdc]/10 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-4">Quantity</th>
                            <th className="py-3 px-4">Unit Price</th>
                            <th className="py-3 px-4">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bill.items.map((item) => (
                            <tr key={item._id} className="border-b border-[#f4ebdc]/5 last:border-0">
                                <td className="py-3 px-4 text-[#f4ebdc]">{item.menuItem.itemName}</td>
                                <td className="py-3 px-4 text-[#d9cdb9]">{item.quantity}</td>
                                <td className="py-3 px-4 text-[#d9cdb9]">
                                    ₹{item.unitPrice?.$numberDecimal || item.unitPrice}
                                </td>
                                <td className="py-3 px-4 text-[#d9cdb9]">
                                    ₹{item.amount?.$numberDecimal || item.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="font-['Fraunces',Georgia,serif] text-xl text-[#c6a15b] mt-5 text-right">
                Total: ₹{bill.totalAmount?.$numberDecimal || bill.totalAmount}
            </h3>
        </div>
    );
};

export default BillPreview;