import { useState } from 'react';
import api from '../../api/axios';

const InvoiceEntryForm = ({ purchaseOrders, onSuccess }) => {
    const [purchaseOrderId, setPurchaseOrderId] = useState('');
    const [invoiceAmount, setInvoiceAmount] = useState('');
    const [message, setMessage] = useState('');

    const createInvoice = async () => {
        try{
            const response = await api.post('/api/v1/invoices', {
                purchaseOrderId,
                invoiceAmount: Number(invoiceAmount)
            });
            setMessage(response.data.message);
            setPurchaseOrderId('');
            setInvoiceAmount('');

            onSuccess();
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error creating invoice');
        }
    };

    return(
        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
            <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Enter Invoice</h2>
            <div className="flex flex-col sm:flex-row gap-3">
                <select value={purchaseOrderId} onChange={(e) => setPurchaseOrderId(e.target.value)}
                    className="flex-1 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                >
                    <option value="">Select purchase order</option>

                    {purchaseOrders.map((order) => (
                        <option key={order._id} value={order._id}>{order.purchaseOrderId}</option>
                    ))}
                </select>

                <input type="number" min="0" placeholder="Invoice amount"
                    value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="w-full sm:w-44 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                />
                <button onClick={createInvoice}
                    className="rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-5 py-3 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]"
                >
                    Save Invoice
                </button>
            </div>
            {message && <p className="text-[0.9rem] text-[#d98b6f] mt-4">{message}</p>}
        </div>
    );
};

export default InvoiceEntryForm;