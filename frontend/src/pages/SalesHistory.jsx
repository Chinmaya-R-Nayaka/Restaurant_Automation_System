import { useEffect, useState } from 'react';
import api from '../api/axios';

const SalesHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchOrders = async () => {
        try{
            const response = await api.get('/api/v1/orders');
            setOrders(response.data.orders);
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error fetching sales history');
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if(loading){
        return (
            <div className="min-h-screen bg-[#1c1512] px-5 py-10 sm:px-8">
                <div className="max-w-5xl mx-auto flex items-center gap-3 text-[#8b7e70]">
                    <span className="h-4 w-4 rounded-full border-2 border-[#c6a15b]/30 border-t-[#c6a15b] animate-spin motion-reduce:animate-none"/>
                    Loading sales history...
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto">
                <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc] mb-6">Sales History</h1>

                {message && <p className="text-[0.92rem] text-[#d98b6f] mb-6">{message}</p>}

                {orders.length === 0 ? (
                    <div className="rounded-[18px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-12 text-center text-[#8b7e70]">
                        No orders found
                    </div>
                ) : (
                    <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">Order Date</th>
                                    <th className="py-3 px-4">Total Amount</th>
                                    <th className="py-3 px-4">Payment Mode</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                        <td className="py-3 px-4 text-[#f4ebdc]">{order.orderId}</td>
                                        <td className="py-3 px-4 text-[#d9cdb9]">
                                            {new Date(order.orderDate).toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 text-[#c6a15b]">
                                            ₹{order.totalAmount?.$numberDecimal || order.totalAmount}
                                        </td>
                                        <td className="py-3 px-4 text-[#d9cdb9]">{order.paymentMode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesHistory;