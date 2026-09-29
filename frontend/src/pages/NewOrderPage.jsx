import { useState } from 'react';
import api from '../api/axios';
import OrderItemTable from '../components/order/OrderItemTable';
import BillPreview from '../components/order/BillPreview';
import BillPrint from '../components/order/BillPrint';

const NewOrderPage = () => {
    const [itemCode, setItemCode] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [bill, setBill] = useState(null);

    const addItem = async () => {
        try{
            const response = await api.get(`/api/v1/menu-items`);
            const menuItem = response.data.menuItems.find(
                (item) => item.itemCode === itemCode
            );

            if(!menuItem){
                setMessage('Menu item not found');
                return;
            }

            if(!menuItem.isAvailable){
                setMessage('This menu item is currently unavailable');
                return;
            }

            const existingItem = items.find(
                (item) => item.itemCode === itemCode
            );

            if(existingItem){
                setItems(
                    items.map((item) =>
                        item.itemCode === itemCode? { ...item,
                                quantity: item.quantity + Number(quantity),
                                // amount: Number(item.unitPrice) + Number(menuItem.price) * Number(quantity)
                            } : item
                    )
                );
            }
            else{
                setItems([...items,
                    {
                        itemCode: menuItem.itemCode,
                        itemName: menuItem.itemName,
                        quantity: Number(quantity),
                        unitPrice: Number(menuItem.price)
                    }
                ]);
            }
            setItemCode('');
            setQuantity(1);
            setMessage('');
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error adding menu item');
        }
    };

    const removeItem = (itemCode) => {
        setItems(items.filter((item) => item.itemCode !== itemCode));
    };

    const createOrder = async () => {
        try{
            if(items.length === 0){
                setMessage('Please add at least one item');
                return;
            }
            setLoading(true);
            setMessage('');

            const response = await api.post('/api/v1/orders', {
                items: items.map((item) => ({
                    itemCode: item.itemCode,
                    quantity: item.quantity
                })),
                paymentMode
            });

            const orderId = response.data.order._id;
            const billResponse = await api.post(`/api/v1/orders/${orderId}/bill`);
            setBill(billResponse.data.bill);
            setMessage(billResponse.data.message);
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error creating order');
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">New Order</h1>
                    <p className="text-[#8b7e70] mt-1 text-[0.95rem]">Add items and generate a bill</p>
                </div>

                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input type="text" placeholder="Enter item code" value={itemCode} onChange={(e) => setItemCode(e.target.value)}
                            className="flex-1 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40 outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        />

                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                            className="w-full sm:w-28 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        />

                        <button onClick={addItem}
                            className="rounded-[9px] border border-[#f4ebdc]/20 px-5 py-3 text-[0.95rem] text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]"
                        >Add Item</button>
                    </div>
                </div>

                <OrderItemTable items={items} onRemove={removeItem}/>

                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    <label className="block">
                        <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Payment Mode</span>
                        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
                            className="rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        >
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Card</option>
                        </select>
                    </label>

                    <button onClick={createOrder} disabled={loading}
                        className="rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-6 py-3 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >{loading ? 'Creating...' : 'Create Order'}</button>
                </div>

                {message && <p className="text-[0.92rem] text-[#d98b6f]">{message}</p>}
                <BillPreview bill={bill} />
                <BillPrint bill={bill} />
            </div>
        </div>
    );
};

export default NewOrderPage;