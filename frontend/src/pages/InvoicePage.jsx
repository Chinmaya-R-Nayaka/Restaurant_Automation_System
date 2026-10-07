import { useEffect, useState } from 'react';
import api from '../api/axios';
import InvoiceEntryForm from '../components/invoice/InvoiceEntryForm';
import PaymentStatus from '../components/invoice/PaymentStatus';

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        try{
            const [invoiceResponse, orderResponse] = await Promise.all([
                api.get('/api/v1/invoices'),
                api.get('/api/v1/purchase-orders')
            ]);

            setInvoices(invoiceResponse.data.invoices);
            setPurchaseOrders(orderResponse.data.purchaseOrders);
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error fetching invoice data');
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(loading){
        return (
            <div className="min-h-screen bg-[#1c1512] px-5 py-10 sm:px-8">
                <div className="max-w-5xl mx-auto flex items-center gap-3 text-[#8b7e70]">
                    <span className="h-4 w-4 rounded-full border-2 border-[#c6a15b]/30 border-t-[#c6a15b] animate-spin motion-reduce:animate-none"/>
                    Loading invoices...
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">Supplier Invoices</h1>
                {message && <p className="text-[0.92rem] text-[#d98b6f]">{message}</p>}
                <InvoiceEntryForm purchaseOrders={purchaseOrders} onSuccess={fetchData}/>

                <div>
                    <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Invoice History</h2>
                    {invoices.length === 0 ? (
                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-8 text-center text-[#8b7e70]">
                            No invoices found
                        </div>
                    ) : (
                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                        <th className="py-3 px-4">Invoice ID</th>
                                        <th className="py-3 px-4">Purchase Order</th>
                                        <th className="py-3 px-4">Amount</th>
                                        <th className="py-3 px-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {invoices.map((invoice) => (
                                        <tr key={invoice._id} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                            <td className="py-3 px-4 text-[#f4ebdc]">{invoice.invoiceId}</td>
                                            <td className="py-3 px-4 text-[#d9cdb9]">{invoice.purchaseOrder?.purchaseOrderId}</td>
                                            <td className="py-3 px-4 text-[#c6a15b]">₹{invoice.invoiceAmount?.$numberDecimal || invoice.invoiceAmount}</td>
                                            <td className="py-3 px-4"><PaymentStatus invoice={invoice} onSuccess={fetchData}/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;