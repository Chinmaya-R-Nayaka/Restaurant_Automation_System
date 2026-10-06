import { useEffect, useState } from 'react';
import api from '../api/axios';

const PurchaseOrderPage = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientId, setIngredientId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        try{
            const [ordersResponse, ingredientsResponse] = await Promise.all([
                api.get('/api/v1/purchase-orders'),
                api.get('/api/v1/ingredients/low-stock')
            ]);

            setPurchaseOrders(ordersResponse.data.purchaseOrders);
            setIngredients(ingredientsResponse.data.ingredients);
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error fetching purchase orders');
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createPurchaseOrder = async () => {
        try{
            const response = await api.post('/api/v1/purchase-orders', {
                ingredientId,
                quantity: Number(quantity)
            });
            setMessage(response.data.message);
            setIngredientId('');
            setQuantity(1);

            fetchData();
        }
        catch(error){
            setMessage(
                error.response?.data?.message || 'Error creating purchase order'
            );
        }
    };

    const updateStatus = async (id, status) => {
        try{
            const response = await api.patch(`/api/v1/purchase-orders/${id}/status`, { status });
            setMessage(response.data.message);
            fetchData();
        }
        catch(error){
            setMessage(
                error.response?.data?.message ||
                'Error updating purchase order status'
            );
        }
    };

    if(loading){
        return (
            <div className="min-h-screen bg-[#1c1512] px-5 py-10 sm:px-8">
                <div className="max-w-5xl mx-auto flex items-center gap-3 text-[#8b7e70]">
                    <span className="h-4 w-4 rounded-full border-2 border-[#c6a15b]/30 border-t-[#c6a15b] animate-spin motion-reduce:animate-none"/>
                    Loading purchase orders...
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">Purchase Orders</h1>
                {message && <p className="text-[0.92rem] text-[#d98b6f]">{message}</p>}

                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
                    <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Create Purchase Order</h2>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <select value={ingredientId} onChange={(e) => setIngredientId(e.target.value)}
                            className="flex-1 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        >
                            <option value="">Select low-stock ingredient</option>
                            {ingredients.map((ingredient) => (
                                <option key={ingredient._id} value={ingredient._id}>{ingredient.ingredientName}</option>
                            ))}
                        </select>

                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                            className="w-full sm:w-28 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        />

                        <button onClick={createPurchaseOrder}
                            className="rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-5 py-3 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]"
                        >
                            Create Purchase Order
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Purchase Order History</h2>
                    {purchaseOrders.length === 0 ? (
                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-8 text-center text-[#8b7e70]">
                            No purchase orders found
                        </div>
                    ) : (
                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                        <th className="py-3 px-4">PO ID</th>
                                        <th className="py-3 px-4">Ingredient</th>
                                        <th className="py-3 px-4">Quantity</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody> 
                                    {purchaseOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                            <td className="py-3 px-4 text-[#f4ebdc]">{order.purchaseOrderId}</td>
                                            <td className="py-3 px-4 text-[#d9cdb9]">{order.ingredient?.ingredientName}</td>
                                            <td className="py-3 px-4 text-[#d9cdb9]">{order.quantity}</td>
                                            <td className="py-3 px-4 text-[#c6a15b]">{order.status}</td>
                                            <td className="py-3 px-4">
                                                <select value={order.status}
                                                    onChange={(e) => updateStatus( order._id, e.target.value )}
                                                    className="rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3 py-2 text-[0.88rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Received">Received</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
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

export default PurchaseOrderPage;